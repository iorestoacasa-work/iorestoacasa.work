var hostsMixin = {
    methods: {
        loadHosts: function() {
            fetch('https://iorestoacasa.work/hosts.json')
            .then(r => r.json())
            .then(json => {
                var hosts = json.instances;

                // Order instances by type
                hosts.sort(function (a, b) {
                    return a.software === 'MM' ? -1 : 1;
                });

                // Count MM instances
                var counter = 0;
                for (var i = 0; i < hosts.length; ++i) {
                    if (hosts[i]['software'] == "MM")
                        counter++;
                    else
                        break;
                }

                // Extract MM instances
                let mm = hosts.splice(0, counter);

                // Order MM by usage
                mm.sort(function (a, b) {
                    return a.cpu_usage - b.cpu_usage;
                });

                // Order Jitsi by usage
                hosts.sort(function (a, b) {
                    return a.cpu_usage - b.cpu_usage;
                });

                // Merge results
                hosts = mm.concat(hosts);
                this.hosts = hosts;
            })
        }
    }
}