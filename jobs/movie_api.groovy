multibranchPipelineJob("jenkins-pipeline-movie-api") {
    triggers {
        periodic(1)
    }
    branchSources {
        git {
            remote("git@github.com:JesusPaz/movie-analyst-api.git")
        }
    }
    orphanedItemStrategy {
        discardOldItems {
            numToKeep(20)
        }
    }
}