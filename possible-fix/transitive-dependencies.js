if (includeTransitiveDependents) {
    // for (const directDependent of allDependentProjects) {
    //     // Look through localPackageDependencies to find any which have a target on the current dependent
    //     for (const localPackageDependency of Object.values(localPackageDependencies).flat()) {
    //         if (localPackageDependency.target === directDependent.source) {
    //             transitiveLocalPackageDependents.push(localPackageDependency);
    //         }
    //     }
    // }
    // console.log('localPackageDependencies', JSON.stringify(localPackageDependencies))
    // const getTransitiveDependencies = (
    //     directDependent,
    //     visited
    // ) => {
    //     if (visited.has(directDependent)) {
    //         return [];
    //     }
    //     visited.add(directDependent)
    //     const result = [];
    //     // Look through localPackageDependencies to find any which have a target on the current dependent
    //     for (const localPackageDependency of Object.values(
    //         localPackageDependencies
    //     ).flat()) {
    //         if (localPackageDependency.target === directDependent.source) {
    //             result.push(...[
    //                 localPackageDependency,
    //                 ...getTransitiveDependencies(localPackageDependency, visited)
    //             ]);
    //         }
    //     }
    //     return result;
    // }
    // const visited = new Set();
    // for (const directDependent of allDependentProjects) {
    //     transitiveLocalPackageDependents.push(...getTransitiveDependencies(directDependent, visited));
    // }
    const addTransitiveDependencies = (
        directDependent,
        accumulated
    ) => {
        // Look through localPackageDependencies to find any which have a target on the current dependent
        for (const localPackageDependency of Object.values(
            localPackageDependencies
        ).flat()) {
            if (!accumulated.has(localPackageDependency) && localPackageDependency.target === directDependent.source) {
                accumulated.add(directDependent)
                addTransitiveDependencies(localPackageDependency, accumulated)
            }
        }
    }
    const accumulated = new Set();
    for (const directDependent of allDependentProjects) {
        addTransitiveDependencies(directDependent, accumulated);
    }
    transitiveLocalPackageDependents.push(...Array.from(accumulated))
    console.log('transitiveLocalPackageDependents:', JSON.stringify(transitiveLocalPackageDependents));
}