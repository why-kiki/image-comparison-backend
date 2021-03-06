import { TestResult } from 'image-comparison-frontend';
import { Context } from 'koa';
import * as Router from 'koa-router';

import { AcceptHelper, FileHelper, JsonHelper } from '../helper';

export class BranchController {
    public static async branch(ctx: Router.IRouterContext) {
        const branchName = ctx.params.name;
        const branchDictionary = FileHelper.getBranchDictionary();
        const branchDir = branchDictionary[branchName];
        const results: TestResult[] = await JsonHelper.getTestResults(branchDir);
        await ctx.render('branch', { branchName, testResults: results });
    }

    public static async accept(ctx: any) {
        const branchName = ctx.request.body.branchDir;
        const testName = ctx.request.body.name;
        const result = await AcceptHelper.acceptTest(branchName, testName);
        const response: Context = ctx.response;
        if (result.success) {
            response.status = 200;
        } else {
            response.status = 500;
            response.message = result.error;
        }
    }
}
