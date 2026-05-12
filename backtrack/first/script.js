function subsets(nums) {
    const result = [[]];

    for (const num of nums) {
        const newSubsets = [];

        for (const subset of result) {
            newSubsets.push([...subset, num]);
        }

        result.push(...newSubsets);
    }

    return result;
}

console.log(subsets([1, 2, 3]));