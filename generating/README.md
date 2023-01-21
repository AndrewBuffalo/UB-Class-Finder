# UB-Class-Finder


## Collaboration
#### IMPORTANT: Make sure to `git pull` before working on anything 
### Creating Branch 
Instead of using forked repos, we can use branches to keep everyone's work flow separate.
1. Clone the main repo
2. Create a branch for a new feature using 
   ```
   git checkout -b <branch-name>
   ```
   or `git checkout <branch-name>` into an existing branch

3. Work on the code

Note: At this point, the branch only exists locally on your computer
### Pushing changes
Once you are done working on the branch locally, you can push it Github for collaboration etc.
1. To commit changes, run
   ```
   git commit -a
   ```
2. To push the branch onto Github use this command:
   ```
   git push --set-upstream origin <branch-name>
   ```
   The branch should now be visible to everyone else on Github

3. The branch will now have a *pull and merge request* attached to it 

   Work on the branch with other people, etc.

4. When it is ready, someone can merge it with `master`
      1. I think we should have at least 2 people approve the new branches before merging it with master

There will probably be a couple of merge conflicts since we are all going to be working on the same things at times. 

## License
[MIT](https://choosealicense.com/licenses/mit/)
