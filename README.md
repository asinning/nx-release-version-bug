This repository is to demonstrate a bug with the nx command:

`nx release version --specifier=patch --projects={some-package-in-dependency-graph}`

The project in this repo has the structure:

graph-top
- dep-a
    - dep-b
        - dep-c
            - dep-d

We would expect `nx release version --specifier=patch --projects=dep-d` to bump the patch version for all 5 packages in the project; however, it only updates dep-d, dep-c and dep-b.

We would expect `nx release version --specifier=patch --projects=dep-c` to bump the patch version for all the packages in the project except for dep-d; however, it only updates dep-c, dep-b and dep-a.

We would expect `nx release version --specifier=patch --projects=dep-b` to bump the patch version for dep-b, dep-a and graph-top, and this is exactly what it does.

Even if we specify three packages in the middle of the graph, we do see the top most package updated. `npx nx release version --specifier=patch --projects=dep-a,dep-b,dep-c` only updates deps 1, b and c.

However, and this is most curious of them all, `npx nx release version --specifier=patch --projects=dep-a,dep-b,dep-c,dep-d` will update all 5 packages, even though graph-top is not in the list.

In conclussion, it appears that the command `nx release version` tends to have a depth limit of 2; however, the exact pattern is difficult to determine.

