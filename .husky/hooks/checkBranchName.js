const branchName = process.env.HUSKY_GIT_PARAMS.split(' ')[0];

if (/^((fix|hot-fix|main|development|feat|ci)\/[a-zA-Z0-9\-]+)$/gm.test(branchName)) {
  console.error('Error: Branch name should start with "fix/", "hot-fix/", "main/", "development/", "feat/", "ci/"');
  process.exit(1);
}
