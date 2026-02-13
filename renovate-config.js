export default {
  branchPrefix: 'renovate/',
  username: 'renovate-release',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  onboarding: false,
  requireConfig: 'optional',
  platform: 'github',
  forkProcessing: 'enabled',
  dryRun: 'false',
  packageRules: [
    {
      description: 'lockFileMaintenance',
      matchUpdateTypes: ['pin', 'digest', 'patch', 'minor', 'major', 'lockFileMaintenance'],
      dependencyDashboardApproval: false,
      minimumReleaseAge: null,
    },
  ],
};
