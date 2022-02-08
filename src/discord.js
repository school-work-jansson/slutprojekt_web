import fetch from "node-fetch";


/*
    Informations video ang oAuth2.0
    -> https://youtu.be/j-bHvqQ378s?t=302

*/

class DiscordAuth {
    constructor(){

        this.CLIENT_ID = process.env.CLIENT_ID;
        this.CLIENT_SECRET = process.env.CLIENT_SECRET;
        this.REDIRECT_URI = process.env.REDIRECT_URI;
        this.OAUTH_SCOPE = process.env.OAUTH_SCOPE;
        this.DISCORD_ENDPOINT = process.env.DISCORD_ENDPOINT;

    }

    async initial_auth(query_code) {
        // Hämtar första access_token och refresh_token
        let access_token = await this.token_exchange(query_code)

        // Retrives clients data from discord
        let client_data = await this.get_user_data(access_token)

        return [client_data, discord_auth_data.refresh_token]
    }


    
    /*
        Initiala steget för kommunikationen med discord
        Efter att användaren har klickat på "accept" på discords sida
        Så skickar discord tillbaka användaren till denna med en query_code
        denna query_code + CLIENT_ID + CLIENT_SECRET
        använder jag och skickar till discord för att få en access_token + refresh_token mm
    */
    async token_exchange(query_code) {
        const body_data = new URLSearchParams();
        body_data.append('client_id', CLIENT_ID);
        body_data.append('client_secret', CLIENT_SECRET);
        body_data.append('grant_type', 'authorization_code');
        body_data.append('code', query_code);
        body_data.append('redirect_uri', REDIRECT_URI);
        body_data.append('scope', 'identify email');

        const authData = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
            body: body_data
        }

        try {
            let discord_token_response = await fetch(`${DISCORD_ENDPOINT}/oauth2/token`, authData);
            return await discord_token_response.json()
        } catch (err) {
            return {get_discord_oauth_token: null, error: err}
        }
    }


    /*
        Anledningen varför denna medtod används är till för att göra access_token "shorlived"
        Genom att be om en ny access_token mha sin refresh_token så gör man den gammla access_token oglitig
        Detta minskar risken för att den läcks och obehöriga får tillträde till användarens konto

        Orginellt sätt så kommer refresh_token ifrån första token_exchangen med discord. 
        // https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/

        // TODO: Antingen spara refresh token i cookie/session eller spara i databas (Troligen dålig idé, idée nmr 2)

        # https://stackoverflow.com/questions/38986005/what-is-the-purpose-of-a-refresh-token
    */
    async get_new_tokens(refresh_token) {
        const body_data = new URLSearchParams();
        body_data.append('client_id', CLIENT_ID);
        body_data.append('client_secret', CLIENT_SECRET);
        body_data.append('grant_type', 'refresh_token');
        body_data.append('refresh_token', refresh_token);
    
        const authData = {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
          body: body_data
        }
    
        try {
            let token_reponse = await fetch(`${DISCORD_ENDPOINT}/oauth2/token`, authData);
            // console.log(discord_refresh_response)
            return await token_reponse.json()
    
        } catch (err) {
            return {discord_refresh_response: null, error: err}
        }
    }


    /*
        Denna metod frågar discord efter användardatan mha access_token.
        Om denna access_token är gilltig så kommer discord att skicka tillbaka användarens data innanför "scope"
    */
    async get_user_data(access_token) {
        try {
            // Get user data from the authenticated user
            let discord_auth_info = await fetch(`${DISCORD_ENDPOINT}/users/@me`, {
                headers: {
                    authorization: `${discord_token_data.token_type} ${discord_token_data.access_token}`,
                }
            });
            return await discord_auth_info.json()
    
        } catch (err) {
            
            return {client_data: err}
        }
    }
}

export { DiscordAuth }






