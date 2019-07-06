import subprocess


def getBranchLabel():
   branchLabel = subprocess.check_output(
       ["git", "branch"]).decode("utf8").strip()
   branchLabel = next(line for line in branchLabel.split(
       "\n") if line.startswith("*"))
   branchLabel = branchLabel.strip("*").strip()
   return branchLabel


def getCommitHash():
   commitHash = subprocess.check_output(
       ["git", "log", "--pretty=format:'%H'", "-n1"]).decode("utf8").strip("'").strip()
   return commitHash


def getCommitMessage():
   commitMessage = subprocess.check_output(
       ["git", "log", "--pretty=format:'%B'", "-n1"]).decode("utf8").strip("'").strip()
   return commitMessage


def getCommitVersion():
   return "{}:{} ({})".format(getBranchLabel(), getCommitHash(), getCommitMessage())
