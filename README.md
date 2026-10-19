# MERNa server including a template for Node.js and Express hosted on Microsoft Azure
MERNa stands for MongoDB, Express, React, abd Node on Azure. 

This repository serves as a template that can be used as a template to create a Node.js and Express based website hosted 
on Microsoft Azure.

Azure hosting notes:
Select Node 18 LTS

To execute locally:
git clone [[your-repository-url]]
cd [[your-repository-url]]
npm install express
npm start

# Health Insurance Risk Calculator – Node.js API Server

## Project Information

**Team Name:** PurpleCobras  
**University:** Lewis University  
**Course:** Software Engineering

### Team Members
- Isaac Joseph
- Nick Dahlin
- Justin Hobbs

## Project Description

The Health Insurance Risk Calculator API Server is the backend component of the PurpleCobras team's Software Engineering project at Lewis University.

The purpose of this server is to process health information submitted by the static client application and calculate a potential customer's health insurance risk.

The server is developed using Node.js and Express.js and provides RESTful API endpoints for BMI calculations, blood pressure classification, and overall risk assessment.

The server is responsible for validating input data, performing calculations, and returning results to the client application.

## Technologies Used

- Node.js – Server-side JavaScript runtime
- Express.js – RESTful API framework
- JavaScript – Application logic and calculations
- npm – Dependency management
- Git and GitHub – Version control and collaboration
- Microsoft Azure – Cloud deployment
- Visual Studio Code – Development environment

## API Endpoints

The server is designed to provide four RESTful APIs.

### 1. Ping API

**Endpoint:** `/api/ping`

**Purpose