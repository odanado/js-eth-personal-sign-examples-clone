workflow "deploy to gh-pages" {
  on = "push"
  resolves = ["build", "Not gh-pages", "Only master branch", "Deploy to GitHub Pages"]
}

action "Not gh-pages" {
  uses = "actions/bin/filter@46ffca7632504e61db2d4cb16be1e80f333cb859"
  args = "not branch gh-pages"
}

action "install" {
  uses = "docker://node:10"
  needs = ["Not gh-pages"]
  args = "yarn install"
}

action "lint" {
  uses = "docker://node:10"
  needs = ["install"]
  args = "yarn lint"
}

action "build" {
  uses = "docker://node:10"
  needs = ["install"]
  args = "yarn build"
}

action "Only master branch" {
  uses = "actions/bin/filter@46ffca7632504e61db2d4cb16be1e80f333cb859"
  needs = ["lint", "build"]
  args = "branch master"
}

action "Deploy to GitHub Pages" {
  uses = "maxheld83/ghpages@v0.1.1"
  env = {
    BUILD_DIR = "dist/"
  }
  needs = ["Only master branch"]
  secrets = ["GITHUB_TOKEN"]
}
