# Claude Configuration

This file contains configuration settings for Claude AI integration.

## Allowed Tools

```yaml
allowed_tools: [
            "bash",
            "git",
            "gh",
            "npm",
          ]
```

## Description

The allowed_tools configuration specifies which tools Claude is permitted to use when working with this repository:

- **bash**: Command line operations and script execution
- **git**: Version control operations
- **gh**: GitHub CLI operations
- **npm**: Node.js package management operations