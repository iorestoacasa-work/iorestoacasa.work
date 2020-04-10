var hostsMixin = {
    methods: {
        loadHosts: function () {
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
        },
        connectedUsers: function () {
            // Somma degli utenti presenti all'interno del JSON
            var sum = 0;
            for (var i in this.hosts) {
                if (this.hosts[i].user_count !== "?" && this.hosts[i].user_count !==
                    undefined &&
                    this.hosts[i].user_count != null) {
                    // console.log(this.hosts[i].user_count);
                    sum += parseInt(this.hosts[i].user_count);
                }
            }
            return sum;
        },
        totalBandwidth: function () {
            var sum = 0;
            for (var i in this.hosts) {
                if (Number.isInteger(parseInt(this.hosts[i].available_bandwidth_mbps))) {
                    sum += parseInt(this.hosts[i].available_bandwidth_mbps);
                }
            }
            if (sum > 1000)
                return (sum / 1000) + ' Gbps';
            return sum + ' Mbps';
        },
    }
}