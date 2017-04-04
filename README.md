# Apache Header Helper

[![Build Status](https://travis-ci.org/wicksome/ahd.svg?branch=master)](https://travis-ci.org/wicksome/ahd)
[![npm version](https://badge.fury.io/js/ahd.svg)](https://badge.fury.io/js/ahd)

> Helper you configure Apache headers



## Installation

```bash
$ sudo npm install -g ahd
$ sudo ahd init
```

## Usage

```bash
$ ahd -e wicksome # enable
$ ahd -d wicksome # disable
```

```bash
$ ahd -d .+@.+ # Interpret pattern as an extended regular expression
```

## Recommand

in bachrc or bash_profile

```bash
alias ahd="sudo ahd"
```