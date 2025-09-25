export const ClaimRequestTool = [
  {
    type: 'function' as const,
    function: {
      name: 'getProjectsByUserId',
      description: 'Get the project of user for a given userId.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The id of the user.(uuid)'
          }
        },
        required: ['userId'],
        additionalProperties: false
      },
      strict: true
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'createClaimRequest',
      description: 'Create request for user from given infomation.',
      parameters: {
        type: 'object',
        properties: {
          staffId: {
            type: 'string',
            description: 'The staffId of user.(uuid)'
          },
          projectId: {
            type: 'string',
            description: 'The id of the project.(uuid)'
          },
          startTime: {
            type: 'string',
            description: 'The start time of the request. After user input, it will be formatted to "HH:mm".'
          },
          endTime: {
            type: 'string',
            description: 'The end time of the request. After user input, it will be formatted to "HH:mm".'
          },
          totalHours: {
            type: 'number',
            description: 'The total hour of the request.(Calculate from start and end time)'
          },
          description: {
            type: 'string',
            description: 'The description of the request.'
          },
          otDate: {
            type: 'string',
            description: 'The date of the request. After user input, it will be formatted to "YYYY-MM-DD".'
          }
        },
        required: ['staffId', 'projectId', 'startTime', 'endTime', 'totalHours', 'description', 'otDate'],
        additionalProperties: false
      },
      strict: true
    }
  }
]
