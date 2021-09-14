# My Dummy Store

Simple project so I can learn and play around with Next.JS and try clean architecture on front-end.

## Folders

How I'm thinking about folder structures for a better and more stable architecture.

### Pages

Since I'm using NextJS, I have only a couple options on where can I put the pages folder. So, for now, I'm leaving where...
I'm trying to separate as much as possible the Views and Components from where and putting all on the presentation layer. Leaving the pages only for de SSR actions.

### Domain

The domain layer is the most high-level policy. Is where I define the entities and use cases. I don't have any implementations where, only interfaces and types. All the implementations will be done in the application layer.

### Application

Also know as data layer. Is the layer responsible for implementing all the uses cases and defining the protocols the use case needs. The protocols defined where will bem implemented in the Infrastructure.

### Infrastructure

Implements all the protocols needed by the application layer. It is responsible for implementing API calls, database access (cookies, localStorage...), third-party libraries and common functions.

### Presentation

Everything related to the view. TSX, Components, CSS. Everything related to the user interface goes here.
