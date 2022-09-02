# UniversityDAO Website and App

Our website for the UniversityDAO organization. It contains full functionality for submitting proposals and voting on them.

Requires git and Node.js to build and run.

## Testing Environment
* OS: Any
* Kernal: Any

## Dependencies
* git
* Node.js

## Build and Run
```shell
git clone https://github.com/UniversityDAO/udao.git
cd udao
npm install
npm run dev
```

## Contributing

### Pull requests
- Pull requests should always be reviewed by at least one other UDAO member prior to being merged.
  - Exceptions include very small pull requests that are not critical to functionality (ie. making frontend buttons look nice)
- Mark unfinished pull requests with the "Work in Progress" label.
- When you start work on something you should have a pull request opened that same day. Or at least as soon as possible so others can be aware of the changes you are making.
- You as the person opening the pull request should assign a reviewer.

### Commit Hygiene
No stringent commit requirements, but in general:
- Try to give clear commit messages.
- When pulling from *upstream*, avoid `git merge` (and `git pull`). Instead, use `git rebase` in
order to avoid merge commits, thus creating a cleaner history.

### Merging
Once your pull request has been Approved it may be merged at your discretion. In most cases responsibility for merging is left to the person who opened the pull request, however for simple pull requests it is fine for anyone to merge.

If substantive changes are made after the pull request has been marked Approved you should ask for an additional round of review.

- Use `squash and merge` if all commits in the PR can be summarized succinctly by a single message.
- Use `rebase and merge` if each commit in the PR has its own significance.
- Avoid just `merge` as it will create an extraneous merge commit.

## License
[GNU Lesser General Public License v2.1](https://choosealicense.com/licenses/lgpl-2.1/)
