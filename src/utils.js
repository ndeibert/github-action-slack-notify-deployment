const { context } = require('@actions/github');

function buildSlackAttachments({ status, color, projectName, actor, repoUrl }) {
  const { owner, repo } = context.repo;
  repoUrl = repoUrl || `https://github.com/${owner}/${repo}`;

  return [
    {
      color,
      fields: [
        {
          title: 'Project',
          value: `<${repoUrl} | ${projectName || repo}>`,
          short: true,
        },
        {
          title: 'Release',
          value: `<${repoUrl}/tree/${process.env.GITHUB_REF_NAME} | ${process.env.GITHUB_REF_NAME}>`,
          short: true,
        },
        {
          title: 'Version',
          value: `${process.env.GITHUB_SHA.substring(0, 6)}`,
          short: true
        },
        {
          title: 'Initiated by',
          value: actor || context.actor,
          short: true,
        },
        {
          title: 'Status',
          value: `<https://github.com/${owner}/${repo}/actions/runs/${process.env.GITHUB_RUN_ID} | ${status}>`,
          short: true,
        },
      ],
      footer_icon: 'https://github.githubassets.com/favicon.ico',
      footer: `<https://github.com/${owner}/${repo} | ${owner}/${repo}>`,
      ts: Math.floor(Date.now() / 1000),
    },
  ];
}

module.exports.buildSlackAttachments = buildSlackAttachments;

function formatChannelName(channel) {
  return channel.replace(/[#@]/g, '');
}

module.exports.formatChannelName = formatChannelName;
