#!/bin/bash
# Test the form submission endpoint

echo "Testing Grant Form Submission..."
curl -X POST http://localhost:5000/api/forms/grant \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fullName": "Test User",
    "phone": "+1234567890",
    "country": "USA",
    "grantCategory": "Education",
    "purpose": "Test submission",
    "amount": "1000",
    "usage": "Testing",
    "impact": "Learning",
    "previousFunding": "No"
  }' \
  -v

echo ""
echo "Check ogunderotamiloluwa@gmail.com for email"
