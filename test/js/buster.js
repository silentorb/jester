var config = module.exports;

config["Bloom tests"] = {
  rootPath: "../",
  environment: "browser", // or "node"
  sources: [
  "extern/jquery-1.7.1.min.js",
  "js/metahub.js",
  "js/bloom.js",
  "js/vineyard.js",
  "js/garden.js",
  "test/model.js"
  ],
  tests: [
  "test/*-test.js"
  ]
}

// Add more configuration groups as needed