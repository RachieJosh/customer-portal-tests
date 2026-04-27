# Plax V3 Customer Portal – Playwright Test Automation Suite

## Overview
This repository contains end-to-end automated tests for the Plax V3 Customer Portal using Playwright. The test suite covers key user journeys to ensure reliability, validation accuracy, and consistent UI behaviour across critical flows — including positive, negative, and edge cases.

**Flows covered:**
- Customer Onboarding
- Login
- Forgot Password
- Aggregator Signup

95+ test cases across 4 flows.

## Tech Stack
- Playwright (JavaScript)
- Node.js
- Page Object Model (POM) — applied to Aggregator flow

## Folder Structure

tests/
- login.spec.js
- onboarding.spec.js
- forgot-password.spec.js
- aggregator.spec.js

pages/
- AggregatorPage.js

## Prerequisites
- Node.js v18+
- npm

## How to Run Tests

### Install dependencies
```bash
npm install
```

### Run all tests
```bash
npx playwright test
```

### Run a specific suite
```bash
npx playwright test tests/aggregator.spec.js
```

### View HTML report
```bash
npx playwright show-report
```