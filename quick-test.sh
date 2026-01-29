#!/bin/bash

# Quick Test Script for Website Template
# This script runs all tests to verify the template setup

set -e

echo "========================================"
echo "  Website Template - Quick Test Suite  "
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -n "Testing: $test_name... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "1. Checking Dependencies"
echo "------------------------"
run_test "node_modules exists" "test -d node_modules"
run_test "tsx is installed" "test -f node_modules/.bin/tsx"
run_test "typescript is installed" "npm list typescript --depth=0"
echo ""

echo "2. Checking Skills"
echo "------------------"
run_test "Skills directory exists" "test -d .opencode/skills"
run_test "remotion.json exists" "test -f .opencode/skills/remotion.json"
run_test "frontend-design.json exists" "test -f .opencode/skills/frontend-design.json"
run_test "backend.json exists" "test -f .opencode/skills/backend.json"
run_test "testing.json exists" "test -f .opencode/skills/testing.json"
echo ""

echo "3. Running Validation Scripts"
echo "------------------------------"
if npm run validate:json > /dev/null 2>&1; then
    echo -e "Testing: JSON validation... ${GREEN}✓ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "Testing: JSON validation... ${RED}✗ FAILED${NC}"
    ((TESTS_FAILED++))
fi

if npm run validate:typescript > /dev/null 2>&1; then
    echo -e "Testing: TypeScript validation... ${GREEN}✓ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "Testing: TypeScript validation... ${RED}✗ FAILED${NC}"
    ((TESTS_FAILED++))
fi
echo ""

echo "4. Testing Content Generation"
echo "------------------------------"
# Clean up previous test
rm -rf generated-content-test 2>/dev/null || true

run_test "Trends crawler execution" "npm run trends:generate -- --keyword 'test' --count 1 --output-dir ./generated-content-test"
run_test "Article generated" "test -f generated-content-test/test-article.md"
run_test "Landing page generated" "test -f generated-content-test/test-landing.html"
run_test "Trends JSON generated" "test -f generated-content-test/test-trends.json"

# Validate JSON structure
run_test "Trends JSON is valid" "node -e 'JSON.parse(require(\"fs\").readFileSync(\"generated-content-test/test-trends.json\"))'"

echo ""
echo "========================================"
echo "          TEST SUMMARY                  "
echo "========================================"
echo ""
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
    echo ""
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    exit 1
else
    echo -e "${YELLOW}Tests Failed: $TESTS_FAILED${NC}"
    echo ""
    echo -e "${GREEN}✅ ALL TESTS PASSED${NC}"
    echo ""
    echo "The website template is fully functional and ready to use!"
fi
