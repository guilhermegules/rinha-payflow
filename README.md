# Rinha Backend Payflow Node.js

Payflow service for "rinha" backend 2025

## Scripts

```bash
# Unit tests with Jest
npm run test

# Start api with ts-node in dev mode
npm run dev:api

# Start worker with ts-node in dev mode
npm run dev:worker

# Build project with tsc
npm run build

# Start api with compiled code
npm run start:api

# Start worker with compiled code
npm run start:worker

```

## Docker containers resources

| Container | Image                            | CPUs | Memory | Details                       |
| --------- | -------------------------------- | ---- | ------ | ----------------------------- |
| api-1     | guilhermegules/rinha-node:latest | 0.4  | 80MB   | API instance 1 – port 3000    |
| api-2     | guilhermegules/rinha-node:latest | 0.4  | 80MB   | API instance 2 - port 3000    |
| worker    | guilhermegules/rinha-node:latest | 0.25 | 40MB   | Worker for consuming payments |
| redis     | redis:7-alpine                   | 0.1  | 20MB   | Cache                         |
| db        | postgres:15-alpine               | 0.25 | 100MB  | database                      |
| nginx     | nginx:latest                     | 0.1  | 30MB   | Load balancer – port 9999     |
| **TOTAL** |                                  | 1.5  | 350MB  | -                             |

## How to publish docker image

```bash
# If needed for debug process you can clean docker volumes
docker compose down -v
docker compose up --build

# Image build (architecture linux/amd64)
docker buildx build --platform linux/amd64 -t guilhermegules/rinha-node:latest .

# Docker hub Login
docker login

# Docker hub image push
docker push guilhermegules/rinha-node:latest
```

## Dev mode

```bash
docker compose -f docker-compose.dev.yml up --build

# or to run services one by one
docker compose -f docker-compose.dev.yml up api
docker compose -f docker-compose.dev.yml up worker
```
