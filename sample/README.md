# Upgrade React Router to v6

## upgrade to v5.1 style

```
$ ncu
Using yarn
Checking /xxxx/UpgradingFromV5ReactRouter/sample/package.json
[====================] 14/14 100%

 react-router-dom  5.1  →  6.2

Run ncu -u to upgrade package.json
```

- props to useParams()
- remove Redirect
- Refactor custome Route (PrivateRoute)

> sample codes are in upgradeToV51 branch

## upgrade to v6

- remove exact
- component to element
- Redirect to Navigate
- Switch to Routes
