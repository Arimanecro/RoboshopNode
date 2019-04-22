class Loader {
  autoLoad(...modules) {
    let partition = [];
    modules.forEach(v => {
      v.forEach(v1 => {
        partition = v1.split("->");
        let comma = partition[0].split(",").map(v => v.trim());
        if (partition.length > 1) {
          comma.forEach(v => (this[v] = require(`${partition[1]}`)[v]));
        } else {
          this[v] = require(`${partition[0]}`);
        }
      });
    });
  }
}

module.exports = { NodeJS: new Loader(), MyMod: new Loader() };