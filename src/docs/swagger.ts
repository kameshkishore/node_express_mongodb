import { userRoutesDoc } from "./userDoc";

export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Rest API Learning',
        version: '1.0.0',
        description: 'A sample API for learning Swagger',
      },
      servers: [
        {
          url: 'http://localhost:8080',
        },
      ],
      tags: [
        { name: 'User', description: 'User routes' },
      ],
      paths: {
        ...userRoutesDoc,
      },
    },
    apis: ['../router/index.ts'],
};