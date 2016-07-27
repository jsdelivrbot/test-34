export class GroupByValueConverter {
    toView(array, groupBy) {

        var groups = {};

        array.forEach(function (o) {
            var group = o[groupBy];
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });

        return Object.keys(groups).map(function (group) {
            return {
                group: group,
                values: groups[group]
            };
        })
    }
}