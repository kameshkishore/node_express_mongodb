const getAllUserDoc = {
    tags: ['User'],
    description: 'List all of the users',
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'array',
                        example: [{ role: 'string', _id: 'string', userName: 'string', email: 'string', createdDate: 'date' }],
                    }
                }
            }
        }
    }
}

const createUserDoc = {
    tags: ['User'],
    description: 'Create a user',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email of the user',
                            example: 'abc@gmail.com',
                        },
                        userName: {
                            type: 'string',
                            description: 'name of the user',
                            example: 'Test',
                        },
                        password: {
                            type: 'string',
                            description: 'password of the user',
                            example: 'Test@123',
                        },
                        role: {
                            type: 'string',
                            description: 'role of the user',
                            example: 'USER',
                        },
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        example: { role: 'string', _id: 'string', userName: 'string', email: 'string', createdDate: 'date', authentication: { sessionToken: 'string' } },
                    }
                }
            }
        }
    }
}

const getUserByIdDoc = {
    tags: ['User'],
    description: 'Get a user by id',
    parameters: [{
        name: 'id',
        in: 'query',
        description: 'id of the user',
        type: 'string',
        example: '12G45H7899JL'
    }],
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        example: { role: 'string', _id: 'string', userName: 'string', email: 'string', createdDate: 'date' },
                    }
                }
            }
        },
        400: {
            description: 'User not found',
        }
    }
}

const deleteUserByIdDoc = {
    tags: ['User'],
    description: 'Delete a user by id',
    parameters: [{
        name: 'id',
        in: 'query',
        description: 'id of the user',
        type: 'string',
        example: '12G45H7899JL'
    }],
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        example: { role: 'string', _id: 'string', userName: 'string', email: 'string', createdDate: 'date' },
                    }
                }
            }
        },
        400: {
            description: 'User not found',
        }
    }
}

export const userRoutesDoc = {
    '/users': {
        get: getAllUserDoc,
        post: createUserDoc,
    },
    '/users/id': {
        get: getUserByIdDoc,
        delete: deleteUserByIdDoc,
    },
}
