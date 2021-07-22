import { search } from "./getsearch"
import Fuse from 'fuse.js'

export default function(language="asv"){

    const list = search[language]

    const options = {
        keys : [
            "d",
            "a",
        ],
        includeScore: true,
        threshold: 0.1,
        ignoreLocation: true,
    }

    const fuse = new Fuse(list, options)

    return function(text){ return fuse.search(text, {limit: 20}) }
}