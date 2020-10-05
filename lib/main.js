"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const github = require('@actions/github');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const travis_token = core.getInput('TRAVIS_TOKEN');
            const message = `[![Build Status](https://travis-ci.com/MerchantsBonding/verificator.svg?token=${travis_token}&branch=verificator-runs)](https://travis-ci.com/MerchantsBonding/verificator)`
            const github_token = core.getInput('GITHUB_TOKEN');
            const context = github.context;
            if (context.payload.pull_request == null) {
                core.setFailed('Not linked to a pull request');
                return;
            }
          console.log(context.payload.pull_request);

            const pull_request_number = context.payload.pull_request.number;
          const pull_request_body = context.payload.pull_request.body;
            const octokit = new github.GitHub(github_token);
          const new_body = `${pull_request_body} <br/> ${message}`
          octokit.pulls.update(Object.assign(Object.assign({}, context.repo), { pull_number: pull_request_number, body: new_body }));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
