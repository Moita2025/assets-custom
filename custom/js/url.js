function getSearchParam(paramName, defaultParam = "", map = null, isInt = false){
    const params = new URLSearchParams(window.location.search);
    const value = params.get(paramName);

    if (value == null) return defaultParam;

    if (map && typeof map === "object") 
    {
        if (value in map) {
            value = map[value]; 
        } else {
            return defaultParam;
        }
    }
    
    return isInt ? parseInt(value, 10) : value;
}

function updateUrl(url, { clearHash, usePush }) {
    if (clearHash) url.hash = "";
    const method = usePush ? "pushState" : "replaceState";
    window.history[method]({}, "", url.toString());
}

function updateSearchParam(
    key,
    value,
    clearHash = true,
    usePush = false,
    removeEmpty = true
) {
    if (typeof key !== "string") {
        console.warn("updateSearchParam: key must be a string");
        return;
    }

    const url = new URL(window.location.href);

    if (
        value === undefined ||
        (removeEmpty && (value === null || value === "" || Number.isNaN(value)))
    ) {
        url.searchParams.delete(key);
    } else {
        url.searchParams.set(key, String(value));
    }

    updateUrl(url, { clearHash, usePush });
}

function updateSearchParams(
    params = {}, 
    clearHash = true, 
    usePush = false,  
    removeEmpty = true
){
    const url = new URL(window.location.href);

    Object.keys(params).forEach(key => {
        const value = params[key];

        if (
            removeEmpty &&
            (value === null || value === undefined || value === "" || Number.isNaN(value))
        ) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, String(value));
        }
    });

    updateUrl(url, { clearHash, usePush });
}

function isLocalhost() {
    const { hostname } = window.location;

    return (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".local")
    );
}