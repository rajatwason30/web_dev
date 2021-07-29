# First Time
* git config --global user.name "Rajat"
* git config --global user.email "rajatwason30@gmail.com"
# If new git repository
* git init
* git remote add origin <remot-repo-link>

# Always steps For Git
* Stage Changes : git add . ( Stage all files )
* Commit staged changes : git commit -m "commit message"
* Push changes of <branchName> to remote : git push -u origin <branchName>

# Other general commands
* See remote repo details : git remote show origin
* Remove remote repo : git remote rm <remote-name>
* Check status of all files : git status
* See commit history : git log
* To change all the modified files to the last committed version (undo the modifications) : git checkout -f 
* To change the modified file <filename> to the last committed version (undo the modifications) : git checkout <filename>

# Pull changes to local
* Simple conflict: Suppose there are 2 files 'a' and 'b'. 'b' is updated by someone on remote and you make changes in 'a' locally, now before pushing, pull the changes to your local repo using : git pull and then push. 
* Merge conflict: when you change in “a” and someone else also changes in “a” and now you pull before pushing, a merge conflict will occur. You get the option to "accept your changes", "accept incoming changes", "accept both", etc. After selecting one of the options, you need to again stage and commit and then push. This push overrides the remote repo according to the option selected. 
* Git pull runs git fetch followed by git merge. Git pull brings all changes from remote to local and merge them, git fetch just tells(bring) all changes from remote to local but does not merge them into local.

# Branch related commands
* Create locally new branch: git branch <branchName>
* Change the working branch: git checkout <branchName>
* Create and switch to a new branch locally: git checkout -b <branchName>
* To merge <branchName> with main/master: switch to main and then: git merge <branchName>
* Delete a branch: git delete -d <branchName>
* To clone repo from remote to local: git clone <repoLink>
* Fork: creates a copy of the repo from which you forked in your github.
