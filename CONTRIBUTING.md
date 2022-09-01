# Contributor Guidelines
Some of these guidelines are influenced from the Trin portalnet client. Thanks Trin.

## Pull Requests
- Pull requests **should** always be reviewed by at least one other member of the team prior to being merged.
  - Exceptions include very small pull requests that aren't critical
- Mark unfinished pull requests with the "Work in Progress" label.
- When you start work on something you should have a pull request opened that same day. Or at least as soon
as possible so others can be aware of the changes you're making.
- You as the person opening the pull request should assign a reviewer.

## Commit Hygiene
No stringent commit requirements, but in general:

- Try to give a clear commit messages
- When pulling from *upstream*, avoid `git merge` (and `git pull`). Instead, use `git rebase` in
order to avoid merge commits, thus creating a cleaner history.

## Code Review
Every team member is responsible for reviewing code. The designations :speech_balloon:, :heavy_check_mark:, and :x: **should** be left by a reviewer as follows:

- :speech_balloon: (Comment) should be used when there is not yet an opinion on overall validity of complete PR, for example:
  - comments from a partial review
  - comments from a complete review on a Work in Progress PR
  - questions or non-specific concerns, where the answer might trigger an expected change before merging
- :heavy_check_mark: (Approve) should be used when the reviewer would consider it acceptable for the contributor to merge, *after addressing* all the comments. For example:
  - style nitpick comments
  - compliments or highlights of excellent patterns ("addressing" might be in the form of a reply that defines scenarios where the pattern could be used more in the code, or a simple :+1:)
  - a specific concern, where multiple reasonable solutions can adequately resolve the concern
  - a Work in Progress PR that is far enough along
- :x: (Request changes) should be used when the reviewer considers it unacceptable to merge without another review of changes that address the comments. For example:
  - a specific concern, without a satisfactory solution in mind
  - a specific concern with a satisfactory solution provided, but *alternative* solutions **may** be unacceptable
  - any concern with significant subtleties
  
Contributors **should** react to reviews as follows:
- :x: if *any* review is marked as "Request changes":
  - make changes and/or request clarification
  - **should not** merge until reviewer has reviewed again and changed the status
- (none) if there are no reviews, contributor should not merge.
- :speech_balloon: if *all* reviews are comments, then address the comments. Otherwise, treat as if no one has reviewed the PR.
- :heavy_check_mark: if *at least one* review is Approved, contributor **should** do these things before merging:
  - make requested changes
  - if any concern is unclear in any way, ask the reviewer for clarification before merging
  - solve a concern with suggested, or alternative, solution
  - if the reviewer's concern is clearly a misunderstanding, explain and merge. Contributor should be on the lookout for followup clarifications on the closed PR
  - if the contributor simply disagrees with the concern, it would be best to communicate with the reviewer before merging
  - if the PR is approved as a work-in-progress: consider reducing the scope of the PR to roughly the current state, and merging. (multiple smaller PRs is better than one big one)

It is also recommended to use the emoji responses to signal agreement or that
you've seen a comment and will address it rather than replying.  This reduces
github inbox spam.

Everyone is free to review any pull request.

## Merging
Once your pull request has been Approved it may be merged at your discretion. In most cases responsibility for merging is left to the person who opened the pull request, however for simple pull requests it is fine for anyone to merge.

If substantive changes are made after the pull request has been marked Approved you should ask for an additional round of review.

- Use `squash and merge` if all commits in the PR can be summarized succinctly by a single message
- Use `rebase and merge` if each commit in the PR has its own significance
- Avoid just `merge` as it will create an extraneous merge commit

