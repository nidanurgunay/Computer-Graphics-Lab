# Submission of the exercise
Here you can find all important information for the submission of the _Computer Graphics_ exercise.

## Deadline
New exercise sheets are always uploaded on **Monday**. They have to be edited and handed in until the next tutorial one week later (Monday at 10:00).

## Setting up Gitlab for the exercises.
Exercises will be distributed and turned in via [University Gitlab](https://gitlab.inf.uni-konstanz.de). You can log in with your university account. Please follow these instructions to set up the submission system:
1. you must be familiar enough with _Git_ to use `pull`, `commit`, `push`, `merge` and `tag`. Read through the relevant parts of the freely available _Git_ book, or one of the many available online tutorials. Always remember that a _push_ is required after a _commit_, since only _push_ uploads anything.
2. the commands given below are for using _Git_ on the command line or the Gitlab web interface. However, you can also install a graphical interface for _Git_ and use that instead.
3. navigate to the group _"Visual Computing"_ and then to the subgroup _"Lecture Computer Graphics"_ and then to the _Repository_ _"Computer Graphics Tutorial"_ ([link to repository](https://gitlab.inf.uni-konstanz.de/visual-computing/lecture-computer-graphics/cg-exercise-2023)). There you _fork_ the _repository_ one per group by selecting "Fork" in the upper right corner of the _repository_ view ([link to fork](https://gitlab.inf.uni-konstanz.de/visual-computing/lecture-computer-graphics/cg-exercise-2023/-/forks/new)).
4. you must then invite us, your tutors (patrick.paetzold and michael.stroh), to your _repository_ and give us maintainer access rights. You can find the invite screen under [_Forced Repository_] > _Members_ (bottom left side) > _Invite Members_. Pay attention to the correct access level! Only with the correct rights we can evaluate your submission.
Clone the _Repository_ using _Git_ to get a local copy. **CAUTION**: Do not use "download", only by `git clone` you will get a working copy that you can submit.
5. add your group partner as maintainer to the repository.


## 2. submit duties
After completing the assignments, you may submit as follows:
* _commit_ **AND** _push_ your changes. Make sure your code is compiled and understandable. Please keep your code understandable and comment it in detail.
* Submissions are only searched on the `main`-_Branch_.
* If you are still unsure about using _Git_, check after a _push_ using the web interface if the submission was uploaded the way you wanted it. **Important**: Do not use the web interface to upload your submission!
* After your submission has been _pushed_, please tag your _commit_ with a _tag_. The _tag_ indicates to us that this is the commit that contains your submission.
  * Via Gitlab: Click on _Repository_ > _Tags_ > _Add new tag_. For example, the first exercise is called "01". The _tag_ should match this exactly, so name it "01".
  * Via command line: `git tag -a 01 -m 'Mandatory Comment'`. Don't forget to _push_ the _tag_!
  
**IMPORTANT.
* If the folder of the submission is not named correctly it will not be evaluated. 
* If the tag is not set correctly, the last commit in the folder will be used.


You can use other _Branches_ as `main`, they will not be considered for scoring.

## 3. keep your project up to date


We upload new exercises to the _repository_ weekly, so you should always update your _forked_ _repository_. Using `git merge` this is easy: you just need to add the exercise _repository_ as an external source ("_remote_") once:

```
git remote add tutorial git@gitlab.inf.uni-konstanz.de:visual-computing/lecture-computer-graphics/cg-exercise-2022.git
```

You now have two "_remote_" _repositories_. Your own is called `origin`, while the _remote_ of the exercise is called `tutorial`. You should _push_ all your submissions to `origin`, as this is your private copy of the exercise _repository_. From `tutorial` you only need to read to copy into your local copy the lecture material and the exercises.

You can synchronize your _repository_ with the following commands:


```
git fetch --all
git status
#SHOULD OUTPUT:
#On branch main
#Your branch is up to date with 'origin/main'.
#
#nothing to commit, working tree clean

git merge tutorial/main
# Now e.g. "02" will show up in your local copy. With a _push_ to origin the new change will also be in your repository in gitlab. You can also use your favorite GUI for this.
```

Do not try to _push_ to the `tutorial` _remote_ as you do not have permissions to do so. The flow should always be `tutorial` -> your local copy -> `origin`.

## 4. general

* There is a strict deadline for submission by the start of the tutorial. By this time you must have checked in your submission on the `main`-_Branch_ of your _repository_ and tagged it correctly. Submissions that are late or not correctly tagged cannot be considered and are automatically considered "failed" (0 points).
* If you earn a total of at least 90% of the points in the exercises, then you can earn a grade bonus on the exam grade (more on this in lecture).
* It is strongly recommended that you set up an SSH key for Gitlab, as this will speed up your workflow significantly.
* We will give you feedback on the project through gitlab's issue tracker.
* Do not share access to your _repository_ or task solutions with each other. You may work together on tasks, but the solutions submitted must be independent of each other. Group submissions with group size larger than 2 people are also not allowed. Plagiarism is a serious offense and will be handled according to department policy.