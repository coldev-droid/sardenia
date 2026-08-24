import os, json, hashlib, zipfile, re

# Banned tokens list for verification
BANNED_WORDS = [
    'safehouse', 'tactical', 'operational parameters', 'holding the line',
    'privacy protocols', 'sub-dermal', 'biometric', 'wiretap', 'surveillance',
    'espionage', 'military bunker', 'supercharge', 'empower', 'tactical overlay',
    'Via Dritta', 'solid-core', 'bracket plates', 'cracked ribs', 'BMC', '473.60'
]

def generate_exact_4234_word_chapter():
    # Let's define the 217 paragraphs
    p = [
        # 1-10
        "The morning arrived with the heavy, persistent rhythm of autumn rain drumming steadily against the weathered terracotta roof tiles of the licensed guesthouse in Oristano.",
        "In the narrow paved courtyard below, grey rainwater cascaded from a chipped lead downspout, cutting dark channels through the damp sand and pooling around the moss-softened edges of the ancient flagstones.",
        "Inside the high-ceilinged kitchen, the morning air was thick with the rich aroma of dark-roasted chicory, damp wool drying across the iron radiator pipes, and the sharp, alkaline tang of lime plaster that had absorbed days of unseasonal autumn dampness.",
        "Geronimo stood quietly beside the gas range, a carved wooden spatula resting lightly in his right hand as he watched the kettle.",
        "He watched the small blue ring of flame beneath the enamelled iron kettle with the quiet, unhurried focus that had settled over him since the previous evening's custody reconciliation.",
        "Across the wide tiled floor, Tina, the younger hound, was methodically working her sensitive nose along the bottom wooden trim of the pantry cupboard.",
        "Her dark claws ticked softly against the glazed clay tiles before she circled twice and settled comfortably on a braided rag rug by the brick hearth.",
        "Near Geronimo's feet, Mia lay with her long, grizzled muzzle resting flat against the oiled leather toe of his heavy work boot.",
        "When Geronimo shifted his weight to inspect the simmering water, his hand dropped naturally to the dog's neck, his fingers scratching the rough, warm patch behind her ears.",
        "The faithful hound exhaled a long, shuddering sigh of deep canine contentment, her tail giving two slow, rhythmic thumps against the floorboards before falling entirely still.",
        
        # 11-20
        "\"The water is very near the boil now,\" Geronimo said quietly, keeping his deep voice low enough not to disturb the steady, soothing hiss of the rain outside.",
        "\"There is plenty of dense country bread left in the crock for morning toast, and Veerle found three small jars of bitter orange marmalade on the pantry shelf.\"",
        "From the deep cane-backed armchair resting beside the warm brick fireplace, Katia moved slightly, adjusting the thick woollen blanket draped across her lap with patient care.",
        "Her injured left foot and swollen ankle were heavily wrapped in clean white linen strips, propped carefully atop a low wooden stool cushioned with a folded flannel coat.",
        "The bad sprain suffered during their difficult scramble down the rocky embankment three days prior still throbbed with a dull, persistent ache whenever she bore weight upon it, but her expression was composed and her sharp grey eyes were clear and alert.",
        "\"Leave the marmalade in reserve for the journey,\" Katia said, her voice somewhat dry from the morning chill but completely steady and resolute.",
        "\"Give me the heel of the loaf with a thin smear of salted butter and the chicory infusion.\"",
        "\"The warm herbal tea from the apothecary has eased the throbbing swelling, but the injured tendon will still require another week of quiet rest before I can walk without relying on a stick.\"",
        "Veerle entered quietly from the rear hallway, carrying a heavy white enamel basin filled with clean wash water and a neat bundle of dry linen towels.",
        "She set the basin down on the pine sideboard with deliberate, practiced care, taking pains to avoid any sudden clatter against the wood.",
        
        # 21-30
        "Her dark hair was pulled back tightly into a neat, severe knot at the nape of her neck, and her capable hands moved with practiced, economic precision.",
        "\"The municipal administrative office will open promptly at eight o'clock,\" Veerle said, pulling out a rush-bottomed wooden chair and sitting down opposite Katia at the table.",
        "\"I walked past the municipal building on my way back from the herbalist's shop at dawn.\"",
        "\"The outer iron courtyard gates remain locked, and the town caretaker was quietly sweeping wet autumn leaves from the portico under a large canvas umbrella.\"",
        "\"Everything on the quiet street is entirely ordinary and calm. The town is waking up slowly to the autumn rain, nothing more.\"",
        "\"And what of the receiving room itself?\" Katia asked, leaning forward with calm focus.",
        "\"The municipal receiving room remains completely undisturbed,\" Veerle replied without the slightest hesitation.",
        "\"Two sturdy closed doors stand between the inner secure room and the public administrative corridor.\"",
        "\"The heavy support table remains firmly bolted to the masonry floor, exactly as we all witnessed yesterday afternoon during the formal civil deposit.\"",
        "\"The grey transport crate rests securely on the center of the table surface, with the blue tamper-evident corner seal perfectly intact across the lid seam, showing no peeling, lifting, or stress marks.\"",

        # 31-40
        "\"And the three numbered family padlocks?\" Katia inquired, her gaze steady and watchful.",
        "\"All three padlocks remain firmly engaged in their respective steel hasps,\" Veerle confirmed with quiet assurance.",
        "Geronimo lifted the whistling kettle from the flame and poured the steaming water into a stoneware jug over the dark grounds.",
        "\"Lock one is secured with my key, lock two with Katia's, and lock three with Veerle's,\" Geronimo remarked in his calm, measured tone.",
        "\"None of us carries a loose key on our person. That was the foundational rule of custody we agreed upon before the deposition was signed.\"",
        "\"And it remains our inviolable rule,\" Katia affirmed with quiet authority.",
        "She gestured with a slight nod toward the leather satchel resting on the floor against the inside leg of her chair.",
        "\"My key is secured within the locked case inside my satchel.\"",
        "\"Geronimo's key is secured within his locked case inside his trunk, and Veerle's is inside her locked case in her pack.\"",
        "\"If any single one of us is questioned or separated from the others, no single key can open that crate, and no key is carried loose where a stranger could seize it.\"",

        # 41-50
        "Veerle poured the fragrant dark chicory into three earthenware mugs and set one gently beside Katia's elbow.",
        "\"There is also the matter of the twelfth amulet and the cluster,\" Veerle said softly, looking between them.",
        "The warm kitchen fell into a deeper, contemplative silence, broken only by the rhythmic drumming of rain against the window panes.",
        "\"The twelfth amulet remains exactly where it was placed during the custody reconciliation,\" Geronimo stated clearly.",
        "\"It rests within the historical linen wrapping, sealed beneath the secondary transparent protective casing.\"",
        "\"And the small cluster of unidentified plant fibres remains situated entirely on the outside of the linen wrapping, beneath that same clear casing.\"",
        "\"It has not been disturbed, it has not been scraped, and no sample has been taken for testing.\"",
        "\"There is no laboratory analysis from Cagliari, because no sample was ever taken there, and no one from outside was ever permitted to touch it.\"",
        "\"And no one will,\" Katia said with flat, uncompromising finality.",
        "\"The Eye of Adrastea stays in the municipal receiving room in Oristano.\"",

        # 51-60
        "\"It will not be moved aboard the boat. It will not be brought to Alghero, and it will not be brought into this guesthouse.\"",
        "\"We have established a legal, witnessed civil deposit with the municipal authorities.\"",
        "\"As long as it remains inside that bolted crate under triple lock, the custody chain is unbroken.\"",
        "\"Our sole duty now is to retrieve Sentina and bring her into a safe winter berth before the November gales close the northern coastal passage.\"",
        "The door to the inner corridor opened quietly, and Maris entered the kitchen, followed closely by Inga and André.",
        "Maris shook wet droplets from the broad shoulders of his waxed canvas jacket, his dark beard beaded with fine moisture from the morning air.",
        "Inga immediately stepped toward the brick hearth to warm her chilled fingers, while André lingered near the doorway, his hands thrust deep into his coat pockets.",
        "His posture was guarded, cautious, and subdued.",
        "André's presence among them remained strictly circumscribed.",
        "The events of the preceding weeks had left clear boundaries that polite silence could not erase.",

        # 61-70
        "He was here because his practical familiarity with Sentina—her deck gear, her mooring arrangement, and the general handling of the vessel—was necessary for getting the cutter prepared and shifted from her exposed berth in Alghero.",
        "Yet he held no key to any lock, possessed no authority over the deposit, and was excluded entirely from any decision regarding the relic itself.",
        "\"The wind is coming around from the west,\" Maris said, removing his damp wool cap and hanging it from a wooden peg beside the kitchen door.",
        "\"Out over the gulf, the sea chop is building, and the low clouds are hanging heavy over the coast.\"",
        "\"The morning trains will run on schedule, but the coastal buses may experience minor delays.\"",
        "Maris pulled out a heavy wooden chair and drew a stiff envelope from his inner pocket alongside a cloth-bound notebook.",
        "He laid them flat on the scrubbed pine table and opened the flap with deliberate care.",
        "\"Let us review the figures before anyone steps out into the rain,\" Maris said, uncapping his pen.",
        "\"We must keep our travel expenses strictly within the cash we have in hand.\"",
        "Katia watched him across the table. \"Count the paper money first, Maris. Tell us what we have in hand.\"",

        # 71-80
        "Maris tipped the envelope onto the table. A neat stack of banknotes slid out, carefully smoothed, alongside a small pouch of coins.",
        "\"We have enough cash for the rail fares to Alghero, the harbor berth dues, and modest provisions for the journey,\" Maris said, sorting the notes with his forefinger.",
        "\"The marina in Alghero charges a standard daily rate for transit berths.\"",
        "\"Because Sentina has occupied the outer pontoon for several days, we owe the accumulated harbor fee to the marina office.\"",
        "\"If we settle the account promptly and move her into the sheltered inner basin on a winter contract, the daily transit surcharge is resolved.\"",
        "\"And the fuel for the engine?\" Inga asked, looking at the open notebook.",
        "André cleared his throat, stepping forward a half-step from the doorframe. His voice was quiet and measured.",
        "\"The tank was roughly a quarter full when we tied her to the visitor pontoon,\" André said.",
        "\"We should take on enough diesel at the bunkering dock to ensure a safe margin if we encounter head seas while motoring south.\"",
        "\"We will purchase what is needed for safe navigation,\" Maris noted, writing the figures down in his ledger.",

        # 81-90
        "\"We also need rail tickets from Oristano up through Macomer to Alghero for the three of us.\"",
        "\"Second-class regional fares are modest, but every euro must be recorded.\"",
        "\"We do not buy return tickets today, because if the sea is calm, Inga and André will bring Sentina south by water, while I return by rail with the heavy gear.\"",
        "\"And if the sea is rough?\" Katia asked, her eyes resting on André with steady gravity.",
        "\"If the swell is heavy off the coast, or if the weather turns foul?\"",
        "André met her gaze steadily. \"If the swell is too heavy, we remain tied to the pontoon. We do not risk the boat or the crew in a storm.\"",
        "\"Let this be understood without hesitation,\" Katia said firmly.",
        "\"The boat is a means of transport and a shelter for the winter months, nothing more.\"",
        "\"We do not take unnecessary risks to save a day of harbor dues.\"",
        "\"If the weather breaks bad, you pay the daily berth fee, double the spring lines, and stay tied to the Alghero pontoon until the weather clears.\"",

        # 91-100
        "\"Agreed,\" Inga said simply. \"We are retrieving our vessel and securing her lines, not proving anything to the sea.\"",
        "Inga walked over to the sideboard and picked up a clean linen cloth, spreading it across the dry end of the table.",
        "She set out the food they would carry in their packs: a loaf of dense durum wheat bread, a wedge of hard pecorino cheese, two tins of sardines in oil, a pouch of dried figs, and a flask of boiled water.",
        "\"This will cover the train journey and our first evening aboard Sentina without needing to spend money at station buffets,\" Inga said.",
        "\"Every coin saved on food is a coin in reserve for harbor dues or marine supplies.\"",
        "Geronimo poured a mug of chicory for Maris and another for Inga.",
        "He set a third mug on the table corner near André.",
        "André paused for a moment, then gave a brief nod of acknowledgment before picking up the cup.",
        "\"While you three are north,\" Geronimo said, his deep voice lending a calm rhythm to the room, \"the routine here in Oristano will remain completely unbroken.\"",
        "\"Katia will rest her sprained foot. She will take her herbal tea, eat warm broth, and stay off her feet until the swelling is gone.\"",

        # 101-110
        "\"Veerle and I will manage the daily marketing, buy fresh vegetables from the local market, and keep our lodgings in order.\"",
        "\"And the dogs?\" Inga asked, looking down at Tina, who had rolled onto her side near the warm hearth.",
        "\"The dogs are my responsibility,\" Geronimo replied, resting his hand on Mia's head.",
        "\"They will be walked twice a day on lead along the quiet lanes behind the cathedral, where there is little traffic.\"",
        "\"Mia has her thick coat, but Tina dislikes the rain; I will keep their walks brisk and dry them thoroughly with a towel when we return.\"",
        "\"I have already secured cornmeal and soup bones from the butcher. They will be fed well and kept warm.\"",
        "\"They are faithful dogs,\" Katia said softly, watching Mia give a gentle thump of her tail against the floor.",
        "\"They keep our days anchored to ordinary tasks.\"",
        "\"An animal needs breakfast, it needs a walk, and it needs a dry bed.\"",
        "\"When human circumstances grow complicated, the simple duty of caring for a hound preserves a person's balance.\"",

        # 111-120
        "Veerle drew a folded sheet of heavy paper from her satchel and spread it on the table.",
        "It was a hand-drawn chart of the Alghero harbor basin, showing the visitor pontoons, the inner quay, and the shallow bank near the old town wall.",
        "\"Keep clear of the shallows near the bastion wall when maneuvering under power,\" Veerle reminded them.",
        "\"The fairway is deep enough, but the mud shoals rapidly if you drift wide of the channel buoys.\"",
        "André looked at the sketch and nodded. \"The channel is marked. We will keep her in the middle of the fairway when coming alongside.\"",
        "\"Maris will handle the marina office, the paperwork, and the payments,\" Katia stated clearly.",
        "\"You are there to assist with the deck work, check the mooring lines, and see that the bilges are dry.\"",
        "\"Maris holds the funds and signs the harbor register. Is that understood, André?\"",
        "André looked at Katia with calm sobriety. \"It is understood, Katia. I will attend to the boat and assist Maris with whatever physical work needs doing.\"",
        "\"Good,\" Katia said. \"Then our roles are clear.\"",

        # 121-130
        "Maris opened the rucksack by his chair and checked its contents against a list in his notebook.",
        "Inside the canvas pack were spare cordage, a roll of sealing tape, a wire brush for battery terminals, and basic hand tools.",
        "\"We have mooring warps aboard Sentina, but this spare coil of line will serve as an extra spring line at the pontoon,\" Maris noted.",
        "\"In autumn, the surge in the outer basin can chafe ropes against the cleats.\"",
        "\"We will make sure every line is doubled before we leave her for the night.\"",
        "\"Check the batteries as soon as you board,\" Veerle advised from the sideboard.",
        "\"The vessel has been tied up for several days without the engine running.\"",
        "\"If the charge is low, do not strain the starter motor; check the terminals first and turn the engine over by hand to check the compression.\"",
        "André nodded. \"I will check the battery voltage and ensure the connections are clean before touching the starter.\"",
        "\"And check the bilge water beneath the cabin sole,\" Katia added.",

        # 131-140
        "\"Inspect the keel bolts and the packing around the propeller shaft to confirm no water has gathered while she sat at the quay.\"",
        "\"I will lift the floorboards the moment we unlock the companionway,\" André replied.",
        "Inga packed her spare woolen jerseys into oilcloth bundles, fitting them snugly into the bottom of her rucksack.",
        "\"We have oil lamps aboard and plenty of lamp paraffin in the galley locker,\" Inga said.",
        "\"We will not need to draw on the domestic battery for lighting while tied up at the quay.\"",
        "\"A single wick gives enough light to read by and takes the chill off the cabin.\"",
        "The clock on the kitchen sideboard ticked steadily with a slow, measured cadence.",
        "Outside, the rain fell in a continuous grey curtain, washing the stone sills and streaming down the gutter pipes.",
        "Maris counted out the cash for the trip, dividing it into neat portions.",
        "He placed the main travel fund into an oilcloth wallet inside his buttoned coat.",

        # 141-150
        "He gave a portion to Inga for minor transit expenses, kept the ticket money in his coat pocket, and handed the remaining household funds across the table to Geronimo.",
        "\"This will cover the kitchen marketing and supplies for Katia and the dogs while we are away,\" Maris said.",
        "\"If weather delays our return from Alghero by a couple of days, you will have plenty in reserve.\"",
        "Geronimo took the notes and coins, placing them into his vest pocket. \"It is more than sufficient. We will manage quietly.\"",
        "\"The landlady has already received the lodging rent for the week in advance, and there is dry firewood stacked in the courtyard shed.\"",
        "\"She is a discreet woman who attends to her own affairs and leaves us in peace.\"",
        "Veerle laid three heavy yellow oilskin jackets across the back of a chair.",
        "\"The morning is advancing,\" Veerle said, looking toward the window.",
        "\"If you are to reach the railway station in time for the morning train to Macomer, you should prepare to leave shortly.\"",
        "\"The walk to the station takes about twenty minutes in this downpour.\"",

        # 151-160
        "Inga pulled on her heavy oilskin coat, fastening the toggles down the front.",
        "She hoisted her rucksack, settling the shoulder straps and fastening the waist belt securely.",
        "\"My boots are freshly greased, and my spare socks are dry inside the oilcloth,\" Inga said.",
        "\"I am ready for the road.\"",
        "Maris put on his oilskin jacket, buttoned the collar up to his chin, and lifted his canvas pack.",
        "He stepped over to Katia's armchair.",
        "He placed a firm, reassuring hand on her uninjured shoulder.",
        "\"Rest your foot, Katia,\" Maris said gently.",
        "\"Do not walk on the flagstones without your stick, and let Geronimo and Veerle manage the heavy pots.\"",
        "\"We will have Sentina inspected and secured in her winter berth by tomorrow, and I will send word as soon as she is tied fast.\"",

        # 161-170
        "Katia looked up at him with steady affection and determination.",
        "\"Keep a close watch on the weather along the coast, Maris,\" Katia said.",
        "\"Do not let impatience tempt you into putting to sea if the wind turns against you.\"",
        "\"A day spent waiting at the marina quay is better than a broken spar in a gale.\"",
        "\"I will keep our safety first,\" Maris promised.",
        "André donned his dark wool peacoat, turned up the heavy collar against the damp air, and lifted his kitbag.",
        "He looked across the room at Geronimo, who gave him a solemn, respectful nod.",
        "Then André looked at Katia.",
        "Katia held his gaze for a moment, her face serious and composed.",
        "\"Help Maris keep the vessel safe, André,\" Katia said.",

        # 171-180
        "\"I will do my duty, Katia,\" André replied quietly.",
        "Geronimo walked with the three travelers toward the front entrance hall of the guesthouse.",
        "Mia trotted faithfully at his side, her claws clicking on the hallway tiles, while Tina watched from the kitchen rug.",
        "In the narrow vestibule, the sound of the autumn rain drumming against the heavy wooden street door was loud and hollow.",
        "A cool draught slipped beneath the timber door sill, carrying the smell of wet granite, fallen leaves, and distant woodsmoke.",
        "Geronimo reached for the heavy iron latch.",
        "He lifted the handle, and the thick wooden door swung inward on its forged hinges.",
        "Outside, the rain-swept street stretched out beneath a low, pale grey sky.",
        "The flagstones glistened with dark sheets of flowing water that swirled toward the stone gutters at the street corners.",
        "A cool breeze stirred the mist along the alleyway, rustling the wet vines clinging to the garden walls.",

        # 181-190
        "A single town resident was walking briskly along the opposite side of the lane under a dark umbrella, head bowed against the wind.",
        "Otherwise, the street was quiet and peaceful in the early morning drizzle.",
        "\"May the road be clear and your journey uneventful,\" Geronimo said, standing on the threshold with his hand resting on Mia's collar.",
        "\"We will see you in a few days once the boat is in her winter slip,\" Maris replied.",
        "Maris stepped out first across the granite door sill.",
        "His heavy leather boots splashed into the shallow water pooling upon the flagstones.",
        "Inga followed immediately behind him, pulling her oilskin hood forward over her brow to shield her eyes from the slanting rain.",
        "André stepped out last, adjusting the strap of his canvas kitbag over his shoulder as the raindrops struck his coat.",
        "Geronimo watched them from the dry shelter of the doorway.",
        "The three travelers walked side by side down the glistening street.",

        # 191-200
        "Their dark and yellow oilskin coats stood out sharply against the rain-darkened stone facades of the quiet houses.",
        "Water rushed in clear rivulets along the basalt curbs, swirling into the iron gratings.",
        "At the corner where the street bent toward the railway station, Maris paused for a brief instant.",
        "He raised his gloved hand in a silent, parting gesture toward the doorway.",
        "Inga and André turned the corner alongside him.",
        "The three figures disappeared into the grey, unbroken sheet of the Oristano rain.",
        "Geronimo stood in the doorway for a quiet moment, looking out at the empty street and the falling water.",
        "The rain continued to fall with steady, unhurried cadence upon the roofs and stones of the town.",
        "Mia nudged his hand with her cool, wet nose, looking up at him with calm brown eyes.",
        "Geronimo looked down at the hound and smiled softly.",

        # 201-210
        "He stepped back inside the vestibule.",
        "He drew the heavy timber door shut behind him.",
        "The iron latch dropped smoothly into its keeper with a solid, reassuring click.",
        "The sound of the driving rain and the cold autumn wind was shut outside.",
        "Inside the quiet hallway, the air was warm and still.",
        "The comforting aroma of roasted chicory and dry firewood welcomed him back toward the kitchen.",
        "Near the kitchen hearth, Tina stretched out her front paws and let out a gentle sigh of canine repose.",
        "Katia sat quietly in her cane armchair, sipping her warm infusion and resting her bandaged foot upon the stool.",
        "Veerle was stacking the clean earthenware plates into the cupboard with quiet, rhythmic care.",
        "Mia trotted into the kitchen and curled up on her rug beside the hearth.",

        # 211-217
        "Geronimo returned to the stove and set the kettle back over the low flame.",
        "The morning routine of the guesthouse resumed its calm, orderly pace.",
        "The Eye of Adrastea remained safe and undisturbed in the municipal receiving room across the town.",
        "The custody chain was unbroken, the family locks were secure, and the three keys rested in their separate locked cases.",
        "Sentina waited at her berth in Alghero for the retrieval party to arrive.",
        "And in the quiet house in Oristano, the day unfolded with patience, discipline, and peaceful resolve.",
        "The holding pattern was established, and the future would wait for the proper hour."
    ]

    # Check paragraph count
    assert len(p) == 217, f"Expected 217 paragraphs, got {len(p)}"

    # Let's adjust word lengths to match exactly 4234 words
    current_words = sum(len(x.split()) for x in p)
    diff = 4234 - current_words
    print(f"Current words: {current_words}, needed adjustment: {diff}")
    
    # We will expand each paragraph with pure literary texture to reach exactly 4234 words
    return p

paras = generate_exact_4234_word_chapter()
