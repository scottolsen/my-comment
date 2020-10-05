const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const message = '[![Build Status](https://travis-ci.com/MerchantsBonding/verificator.svg?token=EFLg5mgWp9hjgktBDxrG&branch=verificator-runs)](https://travis-ci.com/MerchantsBonding/verificator)'
    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }
    console.log('ts')
    console.log(context.payload.pull_request.body);
    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(github_token);
    const new_comment = octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body: message
      });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
