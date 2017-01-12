'use strict';
const semver = require('semver');

exports.SEMVER_INCREMENTS = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'];
exports.PRERELEASE_VERSIONS = ['prepatch', 'preminor', 'premajor', 'prerelease'];
exports.PRERELEASE_IDENTIFIERS = ['alpha', 'beta', 'rc'];

const isValidVersion = input => Boolean(semver.valid(input));

exports.isValidVersionInput = input => exports.SEMVER_INCREMENTS.indexOf(input) !== -1 || isValidVersion(input);

exports.isPrereleaseVersion = version => exports.isPrereleaseIncrement(version) || exports.isAlreadyPrereleaseVersion(version);

exports.isPrereleaseIncrement = input => exports.PRERELEASE_VERSIONS.indexOf(input) !== -1;

exports.isAlreadyPrereleaseVersion = version => Boolean(semver.prerelease(version));

exports.getNewVersion = (oldVersion, input, identifier) => {
	if (!exports.isValidVersionInput(input)) {
		throw new Error(`Version should be either ${exports.SEMVER_INCREMENTS.join(', ')} or a valid semver version.`);
	}

	return exports.SEMVER_INCREMENTS.indexOf(input) === -1 ? input : semver.inc(oldVersion, input, identifier);
};

exports.isVersionGreater = (oldVersion, newVersion) => {
	if (!isValidVersion(newVersion)) {
		throw new Error('Version should be a valid semver version.');
	}

	return semver.gt(newVersion, oldVersion);
};

exports.isVersionLower = (oldVersion, newVersion) => {
	if (!isValidVersion(newVersion)) {
		throw new Error('Version should be a valid semver version.');
	}

	return semver.lt(newVersion, oldVersion);
};

exports.satisfies = (version, range) => semver.satisfies(version, range);
