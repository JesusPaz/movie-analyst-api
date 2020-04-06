project_name = "jenkins-pipeline-movie-api"
repo = "git@github.com:JesusPaz/movie-analyst-api.git"

multibranchPipelineJob(project_name) {
    triggers {
        periodic(1)
    }
    branchSources {
        git {
            remote(repo)
        }
    }
    orphanedItemStrategy {
        discardOldItems {
            numToKeep(20)
        }
    }
}