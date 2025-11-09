# Test Data for Bulk User Creation

This directory contains test Excel files for testing the bulk user creation endpoint.

## Generating Test Files

Run the following command to generate test Excel files:

```bash
npm run generate:test-excel
```

This will create three test files in the `test-data/` directory:

1. **bulk-create-valid-users.xlsx** - Contains only valid user data (all should succeed)
2. **bulk-create-invalid-users.xlsx** - Contains invalid user data (all should fail with specific errors)
3. **bulk-create-mixed-users.xlsx** - Contains mix of valid and invalid data (some should succeed, some should fail)

## Excel File Format

All Excel files follow this format:

| Name       | Email                  | Role     |
| ---------- | ---------------------- | -------- |
| John Doe   | john.doe@example.com   | Student  |
| Jane Smith | jane.smith@example.com | Lecturer |

### Column Requirements:

- **Column A (Name)**: User's full name (required)
- **Column B (Email)**: Valid email address (required, must be unique)
- **Column C (Role)**: Role name - must be one of: `Student`, `Lecturer`, `Principal`, `User` (required)

## Test Scenarios

### Valid Users File

- All rows contain valid data
- Expected: All accounts should be created successfully
- Use this to test successful bulk creation

### Invalid Users File

- Contains various validation errors:
  - Missing required fields (name, email, or role)
  - Invalid email formats
  - Non-existent roles
  - Admin role (cannot be assigned)
- Expected: All rows should fail with specific error messages
- Use this to test error handling

### Mixed Users File

- Contains both valid and invalid rows
- Expected: Some accounts created successfully, others fail
- Use this to test partial success scenarios

## Testing the API

### Using cURL

```bash
# Test with valid users
curl -X POST http://localhost:3000/api/v1/users/admin/bulk-create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@test-data/bulk-create-valid-users.xlsx"

# Test with invalid users
curl -X POST http://localhost:3000/api/v1/users/admin/bulk-create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@test-data/bulk-create-invalid-users.xlsx"

# Test with mixed users
curl -X POST http://localhost:3000/api/v1/users/admin/bulk-create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@test-data/bulk-create-mixed-users.xlsx"
```

### Using Postman

1. Set method to `POST`
2. URL: `http://localhost:3000/api/v1/users/admin/bulk-create`
3. Headers: Add `Authorization: Bearer YOUR_ACCESS_TOKEN`
4. Body: Select `form-data`
5. Add key `file` with type `File`
6. Select one of the test Excel files
7. Send request

### Using Swagger UI

1. Navigate to `http://localhost:3000/api/docs`
2. Find the `POST /v1/users/admin/bulk-create` endpoint
3. Click "Try it out"
4. Upload one of the test Excel files
5. Execute

## Expected Response Format

```json
{
  "statusCode": 200,
  "message": "Bulk creation completed: 5 succeeded, 2 failed",
  "data": {
    "total": 7,
    "successCount": 5,
    "failureCount": 2,
    "results": [
      {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "role": "Student",
        "success": true
      },
      {
        "email": "invalid-email",
        "name": "Invalid User",
        "role": "Student",
        "success": false,
        "error": "Invalid email format"
      }
    ]
  }
}
```

## Notes

- Passwords are auto-generated and sent to each user via email
- Admin role cannot be assigned through this endpoint
- Duplicate emails will be skipped with an error message
- Invalid roles will be skipped with an error message
- The response includes detailed results for each row processed
