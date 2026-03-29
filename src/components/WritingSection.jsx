import React from "react";
import styles from "../styles";

export default function WritingSection() {
  return (
    <div>
      <details style={styles.writingSection}>
        <summary style={styles.writingSummary}>The Tenor API</summary>
        <div style={styles.writingContent}>
          <p>
            The Tenor API shuts down June 30, 2026. It is important to clarify
            Tenor itself is not shutting down, only the API. This means while
            the site and GIF sources will remain available, things like
            searching for GIFs will no longer be possible on third-party
            applications such as Discord. Google states this is to "focus our
            resources on enhancing the main Tenor experience". This obviously
            makes no sense and the real reason is cost. Naturally, the most
            intelligent way to evaluate anything is to look at the cost in
            complete isolation and ignore all possible benefits from running
            such a service. The Tenor API is free and has definitely cost Google
            millions over the years, which must be financially catastrophic,
            devastating, and crippling to Google. I'm sure the thought of Google
            losing money causes all of us to weep. Tenor content will still be
            easily accessible through other Google products, like Gboard. In
            other words, Google has finally recognized that Tenor is kind of
            nice for the public, the next logical step is to either shut the
            service down entirely or begin to gatekeep it.
          </p>
          <p>
            Discord is already performing testing with Giphy and Klipy as GIF
            search providers. Klipy, for now, appears to be the far superior
            choice, as it largely copies what is available on Tenor. Giphy's
            selection is quite interesting, to say the least.
          </p>
        </div>
      </details>

      <details style={styles.writingSection}>
        <summary style={styles.writingSummary}>
          Will Tenor GIFs still work?
        </summary>
        <div style={styles.writingContent}>
          <p>
            They should, although Google can technically gatekeep Tenor further,
            and quite easily. The explanation is below.
          </p>
          <details>
            <summary style={styles.writingSubSummary}>Read more</summary>
            <div style={styles.writingContent}>
              <p>
                Discord previews links through a process called unfurling. When
                someone posts a link, Discord sends a request to that URL and
                reads the response. It looks for metadata such as Open Graph
                tags, Twitter Card tags, or oEmbed data, then uses that
                information to generate the link preview. This is how Discord,
                among other apps and web pages, creates a preview with the
                title, description, and any images or videos. This is very
                standard, but it means that it is up to the original page to
                specify the metadata for embedding.
              </p>
              <p>
                Tenor links, and I suppose Giphy and Klipy too, function mostly
                the same way. Discord unfurls the link, but because it
                recognizes it as a Tenor link, it skips unnecessary preview
                elements such as the title and description. It fetches the Tenor
                URL, parses the embed metadata, and finds the direct MP4 version
                of the GIF there. The Tenor link itself is not a direct media
                asset URL. It is a standard webpage URL, similar to links from
                YouTube, Reddit, or X (formerly Twitter). The difference is
                simply that Discord has just a little more special handling for
                Tenor links.
              </p>
              <p>
                GIFs sent through Tenor links on Discord are their MP4 variants,
                which you may have noticed if you tried to save a GIF on the
                mobile app. It downloads as an MP4 because it is one. The GIF
                format is actually highly inefficient, around 10x bigger than
                the MP4 versions of GIFs, so almost every service prefers to
                serve the MP4 variant. There's hardly a loss in quality too. It
                may feel strange to think of GIFs as an MP4 file, but MP4 is
                just a container format. It does not inherently require audio or
                playback controls, so Discord simply hides the playback controls
                and loops the video. If you send a Tenor MP4 link directly, this
                doesn't happen.
              </p>
              <p>
                Though, the real reason for using the MP4 is likely because the
                GIF variant accessible in the Tenor HTML metadata is already
                gatekept by Google. If we try sending the GIF variant that is
                available in the metadata like
                https://media1.tenor.com/m/j2mInKWUP6sAAAAC/quagsire-pokemon.gif,
                we will see it does not embed the GIF at all. Although the URL
                ends in .gif, this page resolves to HTML and not GIF bytes. The
                returned HTML page does not expose usable Open Graph preview
                metadata, so Discord cannot unfurl it as a normal GIF embed.
                Google intentionally serves crawlers a generic HTML page.
              </p>
              <p>
                The WebM variant is also accessible in Tenor links, although
                WebM only just recently became supported on Discord iOS devices
                on November 4, 2025.
                https://discord.com/blog/discord-patch-notes-november-4-2025.
              </p>
              <p>
                Basically, if Google decides to say bye-bye to the metadata that
                allows their links to embed for third parties, that is the MP4
                and WebM links exposed via Open Graph tags, then there's not
                much Discord can do. Of course, we can always just manually go
                to the site and copy the GIF from there, but who would do that?
                Additionally, Google products, for some reason, always send the
                true GIF, not the MP4 or WebM variants. You can test this on
                Google Chat and sending GIFs via Gboard. I suppose this behavior
                is logical for Gboard, as it has to send the GIF otherwise if it
                just attaches a regular MP4, the platform it's being uploaded to
                would have to treat it like how we normally expect MP4s to be
                treated.
              </p>
              <p>
                I think anyone can recognize that keeping the embed metadata
                around and serving these files for free does not meaningfully
                benefit Google, and the thought of Google not benefitting I'm
                sure is too horrifying for any of us to contemplate.
              </p>
              <p>
                Jokes aside, it should be quite cheap to serve these GIFs even
                at the scale Tenor operates. The main cost would be the
                infrastructure required to store and serve the files, but since
                Google owns that infrastructure... It’s still not free, of
                course, but given that Google also runs YouTube, the Play Store,
                Photos, Maps, Meet, Search, etc., basically half the world,
                Tenor’s measurable bandwidth footprint cannot be much different
                than a rounding error. Them taking away the Tenor API and
                stating it's to "focus" on the "main Tenor experience" is just
                ragebait.
              </p>
              <p>
                Anyway, I could be totally incorrect and made the wrong
                assumptions here, so please conclude whatever makes sense to
                you.
              </p>
            </div>
          </details>
        </div>
      </details>

      <details style={styles.writingSection}>
        <summary style={styles.writingSummary}>What Am I Pasting?</summary>
        <div style={styles.writingContent}>
          <p>
            Nothing sensitive, just data Discord holds about your favorite GIFs,
            soundboards, stickers, and some other frequently or recently used
            data like emojis and commands if you ever use those so your Discord
            client can organize the results. Some basic technical details are
            explained below.
          </p>
          <details>
            <summary style={styles.writingSubSummary}>Read more</summary>
            <div style={styles.writingContent}>
              <p>
                This is likely obvious to you, but Discord stores our favorited
                GIFs on their own servers, and the Discord app makes a GET
                request to retrieve that list. The GET request returns a JSON
                object containing a long, unreadable string of characters. That
                string of characters is actually just data encoded in a specific
                way, and it does contain more data than just the favorited GIFs
                as mentioned above, although that's all this tool extracts.
                There's no sensitive personal data stored, and even if there
                was, this tool runs entirely in your browser and nothing is sent
                anywhere.
              </p>
              <p>
                If you've looked for methods to download all your favorite GIFs
                before, you may have seen people talking about
                GIFFavoritesStore. That was when Discord, many years ago, did
                indeed store GIF links using local storage. This was pretty much
                guaranteed to never work well, as GIFs could be cleared away and
                wouldn't sync between mobile and PC, hence why they moved to
                storing it on their own servers.
              </p>
              <p>
                If you are still curious, we can discuss further here. The
                base64 comes from an API response, specifically
                https://discord.com/api/v9/users/@me/settings-proto/2, that is a
                JSON object, with just one field: settings. It is literally of
                the form &#123; "settings" :
                "blahblahblahsupercrazylongunreadablestringasdajhosdagooninghdzxjcnzxkcsds"&#125;.
              </p>
              <p>
                Because the response is JSON, Discord cannot just place raw
                binary data directly into it. JSON is a text format, so its
                values need to be representable as plain text characters. But
                the data Discord wants to send here is not stored as plain text.
                It is stored as protobuf, which is a binary format.
              </p>
              <p>
                This is why base64 is needed. Since protobuf produces binary
                bytes, and JSON expects text, Discord takes the protobuf bytes
                and encodes them as base64. Base64 is simply an encoding that
                turns arbitrary binary data into plain text characters. That
                text can then be placed inside the JSON settings field. Even
                though the outer response is still JSON, the actual data is not
                being sent as ordinary JSON.
              </p>
              <p>
                JSON is easy for humans to read, but it is less compact. Since
                field names and values are stored as plain text, the same
                structure ends up taking far more characters than necessary.
                This increases the size of the payload and uses more bandwidth.
                In other words, more data has to be sent over the network, bad
                for both Discord and the user. Protobuf serializes the data into
                a compact binary format based on a predefined schema. Because
                both sides already know the schema, the message does not need to
                include self-describing information such as field names,
                reducing the amount of data sent.
              </p>
              <p>
                As such, that means we need the predefined schema if we want to
                be able to deserialize and decode the protobuf binary after the
                initial base64 decode. This predefined schema exists somewhere
                in the Discord application, but it is not as a clean source file
                .proto. Luckily, others have already reverse engineered the
                protobuf schemas, which can be found at this link:
                https://github.com/discord-userdoccers/discord-protos, and what
                is used here.
              </p>
              <p>
                The specific proto necessary is FrecencyUserSettings.proto. We
                can see by looking through all the protos, this is the one
                containing favorite GIF schema.
              </p>
              <p>
                Technically, it's not necessary to decode using the full schema,
                since the GIF URLs are still present as string fields and can be
                identified directly after the base64 decode. However, it's nicer
                to fully decode as the metadata contains an order field that
                reflects the order in which the GIFs were favorited.
              </p>
              <p>
                All that remains after parsing the decoded protobuf for links is
                figuring out a method to download all the GIFs, which actually
                can be annoying.
              </p>
            </div>
          </details>
        </div>
      </details>

      <details style={styles.writingSection}>
        <summary style={styles.writingSummary}>
          Why Do Some Downloads Fail?
        </summary>
        <div style={styles.writingContent}>
          <p>
            Even though we can make this website display all of a user’s
            favorited GIFs, the browser itself may still prevent us from reading
            some of them programmatically and packaging them into a ZIP. The
            site’s HTML simply references each GIF URL in the src attribute,
            which allows the browser to load and display it directly. However,
            because of CORS restrictions, displaying a file in the browser is
            not the same as being able to access its contents from JavaScript,
            meaning this tool may be unable to include all files in the ZIP.
          </p>
          <details>
            <summary style={styles.writingSubSummary}>Read more</summary>
            <div style={styles.writingContent}>
              <p>
                CORS is a browser-enforced security mechanism based on response
                headers sent by the server. The server indicates which origins
                are allowed to let browser JavaScript read its responses. For
                example, Access-Control-Allow-Origin: https://example.com allows
                JavaScript running on https://example.com to read the response.
                Access-Control-Allow-Origin: * allows any origin to read it,
                except in cases where credentials are involved. Without the
                appropriate CORS headers, the browser may still send the
                request, but JavaScript will not be allowed to access the
                response. In browsers, making a cross-origin request and being
                allowed to read the response are related but not identical. We
                could open the GIF URL and just save it that way, but that's
                inconvenient the more GIFs we have.
              </p>
              <p>
                Luckily, GIFs from Tenor do have the header
                Access-Control-Allow-Origin: *, so this tool can probably get
                all the Tenor GIFs. Assuming you favorite largely from Tenor,
                most of your GIFs can be downloaded. If it's not from Tenor,
                GIFs may fail to download using the download ZIP button due to
                CORS, despite them probably being there on your browser. It is
                for a good reason, although inconvenient here.
              </p>
              <p>
                GIFs that are sent via file attachment are stored on Discord's
                CDN cdn.discordapp.com, which can easily be downloaded for the
                same reason above.
              </p>
              <p>
                Because CORS is enforced by browsers, a common workaround is to
                send the request through a backend. That is usually the standard
                solution. However, for something as simple as downloading our
                favorite GIFs, routing the request through a backend feels and
                in my opinion is unnecessary. Using a Cloudflare Worker for this
                would be straightforward, but it would likely make the solution
                more fragile by adding extra infrastructure and potential points
                of failure.
              </p>
              <p>
                Anyway, this brings us to using scripts with Invoke-WebRequest
                or curl. These tools make HTTP requests without running inside a
                browser, so CORS does not apply to them. And all of our
                computers should have these tools already. No need to download
                any scripts and Python or route requests to a backend.
              </p>
            </div>
          </details>
        </div>
      </details>

      <details style={styles.writingSection}>
        <summary style={styles.writingSummary}>More Random Details</summary>
        <div style={styles.writingContent}>
          <p>
            Even if Tenor removes MP4 and WebM URLs from its metadata, the MP4
            variant is still quite easy to derive as long as the GIF URL remains
            exposed. For example, given
            https://media1.tenor.com/m/j2mInKWUP6sAAAAC/quagsire-pokemon.gif, we
            can obtain the MP4 URL by removing the 1 and /m, and changing AAAAC
            to AAAPo, resulting in
            https://media.tenor.com/j2mInKWUP6sAAAPo/quagsire-pokemon, which
            resolves to the MP4. That said, if Tenor stops exposing these URL
            patterns entirely or simply stops hosting these variants, this
            method is not useful. In other words, this pretty useless to know,
            and it's unlikely Discord would even use such a dumb and fragile
            method to begin with.
          </p>
          <p>
            This tool actually just strips the 1 and /m to obtain the original
            GIF: https://media.tenor.com/j2mInKWUP6sAAAAC/quagsire-pokemon. File
            extensions in URLs are mostly irrelevant. What matters is the
            response of Content-Type header anyway. GIFs from this URL are not
            wrapped in HTML, so sending this directly in Discord will work.
          </p>
          <p>
            Discord proxies mostly everything. This becomes obvious if we think
            about the alternative. The client could just load a remote asset
            directly, like rendering an image from its original URL. But if it
            did that, the request would come from the user’s device, so the
            server hosting the asset would see the user’s IP address. Without
            proxying, a malicious actor could therefore send an asset and use it
            to obtain our IPs. As such, when favorite a GIF, if it was already
            sent into the chat, we end up favoriting something like
            https://images-ext-1.discordapp.net/external/.../https/media.tenor.com/.../....mp4,
            which is Discord's proxied link. This one does not come with the
            appropriate CORS header, so this tool extracts just the
            media.tenor.com part out.
          </p>
          <p>
            When a GIF is favorited from the GIF panel and not a GIF in chat,
            Discord saves the media.tenor.com URL. This is because the panel
            displays GIFs directly from Tenor rather than through Discord’s
            proxy, which mostly makes sense because they are using the Tenor
            search API. Since Discord doesn't proxy these GIFs, our Discord
            client is the one making the request directly to Google. This is
            great data collection for Google, but I guess they don't need it
            anymore.
          </p>
          <p>Anyway, thanks for reading.</p>
        </div>
      </details>
    </div>
  );
}
