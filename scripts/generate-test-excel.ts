import * as ExcelJS from 'exceljs'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Script to generate test Excel files for bulk user account creation
 *
 * Usage:
 *   npx ts-node -r tsconfig-paths/register scripts/generate-test-excel.ts
 */

interface TestUser {
  name: string
  email: string
  role: string
  description?: string
}

// Test data with various scenarios
const testData: {
  valid: TestUser[]
  invalid: TestUser[]
  mixed: TestUser[]
} = {
  // Valid test cases
  valid: [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Student' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Lecturer' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Principal' },
    { name: 'Alice Williams', email: 'alice.williams@example.com', role: 'User' },
    { name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'Student' },
    { name: 'Diana Prince', email: 'diana.prince@example.com', role: 'Lecturer' }
  ],

  // Invalid test cases (for error handling testing)
  invalid: [
    { name: 'Missing Email', email: '', role: 'Student', description: 'Missing email field' },
    { name: 'Missing Role', email: 'missing.role@example.com', role: '', description: 'Missing role field' },
    { name: '', email: 'missing.name@example.com', role: 'Student', description: 'Missing name field' },
    { name: 'Invalid Email', email: 'invalid-email', role: 'Student', description: 'Invalid email format' },
    { name: 'Invalid Email 2', email: 'test@', role: 'Lecturer', description: 'Invalid email format' },
    {
      name: 'Invalid Role',
      email: 'invalid.role@example.com',
      role: 'NonExistentRole',
      description: 'Role does not exist'
    },
    { name: 'Admin Role', email: 'admin.test@example.com', role: 'Admin', description: 'Admin role cannot be assigned' }
  ],

  // Mixed test cases (valid and invalid)
  mixed: [
    { name: 'Valid User 1', email: 'valid1@example.com', role: 'Student' },
    { name: 'Invalid Email User', email: 'bad-email', role: 'Lecturer', description: 'Should fail' },
    { name: 'Valid User 2', email: 'valid2@example.com', role: 'Principal' },
    { name: 'Missing Role User', email: 'missing.role@example.com', role: '', description: 'Should fail' },
    { name: 'Valid User 3', email: 'valid3@example.com', role: 'User' },
    { name: 'Invalid Role User', email: 'invalid.role@example.com', role: 'InvalidRole', description: 'Should fail' }
  ]
}

async function generateExcelFile(data: TestUser[], filename: string, description: string) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Users')

  // Set column headers
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Role', key: 'role', width: 15 }
  ]

  // Style the header row
  const headerRow = worksheet.getRow(1)
  headerRow.font = { bold: true }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  }

  // Add data rows
  data.forEach((user) => {
    worksheet.addRow({
      name: user.name,
      email: user.email,
      role: user.role
    })
  })

  // Save file
  const outputDir = path.join(__dirname, '../test-data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const filePath = path.join(outputDir, filename)
  await workbook.xlsx.writeFile(filePath)
  console.log(`✅ Generated: ${filename} - ${description}`)
  console.log(`   Location: ${filePath}`)
  console.log(`   Rows: ${data.length}`)
  console.log('')
}

async function main() {
  console.log('📊 Generating test Excel files for bulk user creation...\n')

  // Generate valid test file
  await generateExcelFile(
    testData.valid,
    'bulk-create-valid-users.xlsx',
    'Contains only valid user data (all should succeed)'
  )

  // Generate invalid test file
  await generateExcelFile(
    testData.invalid,
    'bulk-create-invalid-users.xlsx',
    'Contains invalid user data (all should fail with specific errors)'
  )

  // Generate mixed test file
  await generateExcelFile(
    testData.mixed,
    'bulk-create-mixed-users.xlsx',
    'Contains mix of valid and invalid data (some should succeed, some should fail)'
  )

  console.log('✨ All test files generated successfully!')
  console.log('\n📝 Test File Descriptions:')
  console.log('   1. bulk-create-valid-users.xlsx - Use this to test successful bulk creation')
  console.log('   2. bulk-create-invalid-users.xlsx - Use this to test error handling')
  console.log('   3. bulk-create-mixed-users.xlsx - Use this to test partial success scenarios')
  console.log('\n💡 Tip: You can use these files to test the POST /v1/users/admin/bulk-create endpoint')
}

main().catch((error) => {
  console.error('❌ Error generating test files:', error)
  process.exit(1)
})
