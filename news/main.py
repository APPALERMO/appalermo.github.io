#
#          **                ***** **            ***** **            **
#       *****             ******  ****        ******  ****        *****
#      *  ***            **   *  *  ***      **   *  *  ***      *  ***
#         ***           *    *  *    ***    *    *  *    ***        ***
#        *  **              *  *      **        *  *      **       *  **
#        *  **             ** **      **       ** **      **       *  **
#       *    **            ** **      **       ** **      **      *    **
#       *    **          **** **      *      **** **      *       *    **
#      *      **        * *** **     *      * *** **     *       *      **
#      *********           ** *******          ** *******        *********
#     *        **          ** ******           ** ******        *        **
#     *        **          ** **               ** **            *        **
#    *****      **         ** **               ** **           *****      **
#   *   ****    ** *       ** **               ** **          *   ****    ** *
#  *     **      **   **   ** **          **   ** **         *     **      **
#  *                 ***   *  *          ***   *  *          *
#   **                ***    *            ***    *            **
#                      ******              ******
#                        ***                 ***
#


# ------------------------------------------| Pacchetti |---------------------------------------------------------------#

import time
from telethon import TelegramClient
from telethon import events
from github import Github

# ------------------------------------| Variabili non modificabili|-----------------------------------------------------#


Titolo = "🧑‍💻 𝔸ℙℙ𝔸 𝕊𝕌ℙℙ𝕆ℝ𝕋𝕆 𝔹𝕆𝕋 🐍"

api_id = 7864740
api_hash = "d1f992daa2aede681565b56f9d1f33f4"
sessione = "NewsModifier"
client = TelegramClient(sessione, api_id, api_hash)
client.start()
richieste = [""]
cose = []


g = Github("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")
repo = g.get_repo("APPALERMO/appalermo.github.io")
file_path = "news/news.txt"

# ---------------------------------------------| Codice |---------------------------------------------------------------#

print("Bot avviato. . .")

@client.on(events.NewMessage)
async def my_event_handler(e):
    client.parse_mode = "HTML"
    client.disable_web_page_preview = False

    sender = await e.get_sender()
    first_name = sender.first_name
    user_id = sender.id
    admin_id = 1929254957
    message_id = e.id
    chat_id = e.chat_id
    text = e.text.split(" ")
    data = time.strftime("%d - %m - %Y", time.localtime())
    
    # ---------------------------------------------| SEZIONE UTENTE |---------------------------------------------------#

    if e.text == "/start":
        richieste[0] = "titolo"
        await e.respond("🖋 | Nel prossimo messaggio inserire il titolo della Novità!")
    
    if richieste[0] == "titolo":
        if e.text != "/start" and e.text:
            if e.text == "/termina":
                richieste[0] = ""
                await e.respond("❌ | Hai annullato l'aggiunta di novità!")
            else:
                await e.respond("✅ | Titolo impostato:\"<i>{}</i>\"".format(e.text))  
                cose.append(e.text) #titolo
                richieste[0] = "testo"        
                await e.respond("🖋 | Inserire il testo per la Novità!")
    
    if richieste[0] == "testo":
        if e.text != cose[0] and e.text:
            if e.text == "/termina":
                richieste[0] = ""
                await e.respond("❌ | Hai annullato l'aggiunta di novità!")
            else:
                cose.append(e.text) #testo novità
                await e.respond("✅ | Testo impostato:\"<i>{}</i>\"".format(e.text))  
                richieste[0] = ""
    
    if len(cose) == 2:
        await e.respond(f"💬 | Questa sarà la preview del testo della notifica:\n\n📅 | <b>Data</b>: {data}\n🗂 | <b>Titolo</b>: {cose[0]}\n📄 | <b>Testo</b>: {cose[1]}")
        file = repo.get_contents(file_path)
        content_o = file.decoded_content.decode()
        testo = f"""<h2>- {cose[0]}</h2> 📅 | <b>Data</b>: {data}<div style="display: grid;grid-template-columns: auto 1fr;grid-gap: 3px;">➕ | <div>{cose[1]}</div> </div> <br>"""
        new_content = testo
         
        if content_o == "\n" or content_o == " ":
            new_file_content = f"{new_content}"
        else: 
            new_file_content = f"{content_o}\n\n{new_content}"
         
        repo.update_file(file_path, "Aggiornamento Novità!", new_file_content, file.sha)
        await e.edit("Modifiche apportate correttamente, spengo il bot. . .")
        await client.disconnect()
            
            
########################################################################################################################


if __name__ == "__main__":
    client.run_until_disconnected()
