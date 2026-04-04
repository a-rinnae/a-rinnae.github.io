# Discord Favorite GIF Tool

A browser-based tool for viewing and downloading favorited Discord GIFs (most of them), particularly targeting Tenor GIFs due to the API shutting down.

Live site: https://a-rinnae.github.io/

## How It Works

This app takes the base64-encoded `settings` value from Discord’s `settings-proto` response, decodes the protobuf payload, extracts the favorite GIF entries. 

The important parts are:

Tenor links get embedded (most likely) via Open Graph tags. Discord uses the MP4 version, saving on bandwidth as MP4 versions of GIFs are much more efficient, being around a tenth of the size of the true GIF. The real reason, though, is that the true GIF accessible via metadata is wrapped in HTML and does not serve the GIF asset. The HTML page served also doesn't contain any metadata for embedding, which is why if you send a link like https://media1.tenor.com/m/j2mInKWUP6sAAAAC/quagsire-pokemon.gif, it will not embed in Discord. 

Tenor still has the true GIF accessible, just not via metadata. If we remove the 1 and the m/ from the link above, we obtain https://media.tenor.com/j2mInKWUP6sAAAAC/quagsire-pokemon.gif, which is just the asset and can embed. This is not accessible anywhere in metadata, and isn't really documented anywhere, but it becomes quite obvious after just inspecting Tenor URLs. This trick is how this tool downloads the true GIF versions, no need to scrape.

More details are discussed in the actual webpage and not in this README.

## Credits

This project uses a reverse-engineered protobuf schema and it is bundled as `src/frecency-proto.json`. The source of the schema comes from [this repo](https://github.com/discord-userdoccers/discord-protos)

## Disclaimer

This project is not affiliated with Discord, Tenor, or Google.
