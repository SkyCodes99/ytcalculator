/* ═══════════════════════════════════════════════════════════════════
   THE SOCIAL SPOT — tools.js
   Creator Tools: Hook Generator, SEO Scorer, Saturation Checker,
   Retention Curve, End Screen Optimizer, Cards Optimizer,
   Shorts ROI Calculator, Upload Scheduler, Goal Planner.
═══════════════════════════════════════════════════════════════════ */

'use strict';



  function generateHooks() {
    const topic    = (document.getElementById('hook_topic')?.value || '').trim();
    const niche    = document.getElementById('hook_niche')?.value    || 'general';
    const platform = document.getElementById('hook_platform')?.value || 'youtube';
    const resultsEl= document.getElementById('hook_results');
    const cardsEl  = document.getElementById('hook_cards');
    if (!resultsEl || !cardsEl) return;

    if (topic.length < 3) { resultsEl.style.display = 'none'; return; }
    resultsEl.style.display = 'block';

    // Word extraction for personalised hooks
    const words   = topic.split(/\\\\s+/);
    const keyVerb = words.find(w => /ed|ing|s$/i.test(w)) || words[0] || 'this';
    const topicShort = topic.length > 40 ? topic.slice(0, 40) + '...' : topic;
    const isHowTo  = /how|tips|guide|ways|steps/i.test(topic);
    const isStory  = /i |my |we /i.test(topic);
    const hasStat  = /\\\\d/.test(topic);

    // Platform time limit note
    const timeNote = platform === 'shorts' || platform === 'tiktok' || platform === 'reels'
      ? 'Keep under 3 seconds for short-form.' : 'Deliver within 5 seconds for YouTube.';

    const hooks = [
      {
        type: 'Curiosity Gap',
        trigger: 'Creates an information void the viewer MUST fill',
        color: 'var(--primary)',
        scripts: [
          'Most people ' + (niche === 'finance' ? 'lose thousands of dollars' : niche === 'fitness' ? 'never see results' : 'give up') + ' because they skip this one step. Here\\\'s what it is.',
          'I didn\\\'t believe this would work until I tried it myself. Here\\\'s what happened.',
          'Nobody talks about the part of ' + topicShort + ' that actually matters. Until now.'
        ]
      },
      {
        type: 'Bold Claim / Controversial Statement',
        trigger: 'Forces the viewer to challenge or confirm their existing belief',
        color: 'var(--danger)',
        scripts: [
          'Everything you\\\'ve been told about ' + topicShort + ' is wrong. And I can prove it.',
          'The \\"expert advice\\" on ' + (niche === 'fitness' ? 'losing weight' : niche === 'finance' ? 'saving money' : 'this') + ' is actually making things worse.',
          'I used to think ' + topicShort + ' was the answer. It\\\'s not. Here\\\'s what actually works.'
        ]
      },
      {
        type: 'Social Proof / Authority',
        trigger: 'Establishes credibility and sets outcome expectations',
        color: 'var(--success)',
        scripts: [
          'After ' + (niche === 'fitness' ? '3 years of training' : niche === 'finance' ? 'managing six figures' : 'years of research') + ', here is the one thing that changed everything about ' + topicShort + '.',
          'I\\\'ve studied hundreds of cases of ' + topicShort + '. The pattern that separates the ones who succeed is always the same.',
          'This is exactly how I ' + (isStory ? topic.toLowerCase() : 'cracked ' + topicShort) + ' \\u2014 and you can replicate it.'
        ]
      },
      {
        type: 'FOMO / Urgency',
        trigger: 'Creates fear of being left behind if they don\\\'t watch',
        color: 'var(--warning)',
        scripts: [
          'If you\\\'re not doing this right now with ' + topicShort + ', you\\\'re already behind.',
          'The window for this is closing. Here\\\'s why you need to understand ' + topicShort + ' before it\\\'s too late.',
          'Everyone in ' + (niche === 'finance' ? 'investing' : niche === 'fitness' ? 'fitness' : 'this space') + ' already knows this. Now you will too.'
        ]
      },
      {
        type: 'Pattern Interrupt / Unexpected',
        trigger: 'Breaks expectation in the first frame \\u2014 stops the scroll',
        color: 'var(--secondary)',
        scripts: [
          'Wait \\u2014 before you scroll past, you\\\'re going to want to see what happens at the end of this.',
          'I\\\'m going to show you something about ' + topicShort + ' that most creators don\\\'t want you to know.',
          'This video is going to change how you think about ' + topicShort + ' forever. No, seriously.'
        ]
      },
      {
        type: 'Specific Promise / Result',
        trigger: 'Makes a concrete, time-bound, outcome-specific promise',
        color: 'var(--accent)',
        scripts: [
          isHowTo
            ? 'By the end of this video, you\\\'ll know exactly ' + topic.toLowerCase() + ' \\u2014 step by step.'
            : 'In the next ' + (platform === 'youtube' ? '10 minutes' : '60 seconds') + ', you\\\'ll understand ' + topicShort + ' better than most people who\\\'ve been doing it for years.',
          'Here\\\'s the exact system I used to ' + (hasStat ? topic.toLowerCase() : 'get results with ' + topicShort) + '. I\\\'ll show you every step.',
          'I\\\'m going to give you a repeatable framework for ' + topicShort + ' that works even if you\\\'re starting from zero.'
        ]
      }
    ];

    cardsEl.innerHTML = hooks.map((h, i) => {
      const scriptItems = h.scripts.map(s =>
        '<div style=\\"background:var(--bg2);border-radius:var(--radius);padding:10px 12px;margin-bottom:6px;font-size:12px;line-height:1.65;color:var(--text);border-left:2px solid ' + h.color + ';\\">'
        + s
        + '<button onclick=\\"navigator.clipboard.writeText(this.previousSibling?.textContent||\\\'\\\')\\" style=\\"float:right;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:11px;margin-top:-2px;\\" title=\\"Copy\\">\\ud83d\\udccb</button>'
        + '</div>'
      ).join('');
      return '<div class=\\"control-card\\" style=\\"border-left:3px solid ' + h.color + ';\\">'
        + '<div style=\\"display:flex;align-items:center;gap:8px;margin-bottom:4px;\\">'
        + '<span style=\\"font-size:13px;font-weight:700;color:' + h.color + ';\\">' + h.type + '</span>'
        + '</div>'
        + '<div style=\\"font-size:11px;color:var(--text-muted);margin-bottom:10px;font-style:italic;\\">' + h.trigger + ' \\u2014 ' + timeNote + '</div>'
        + scriptItems
        + '</div>';
    }).join('');
  }


  function scoreSEO() {
    const title=(document.getElementById('seo_title')?.value||'').trim();
    const keyword=(document.getElementById('seo_keyword')?.value||'').trim().toLowerCase();
    const type=document.getElementById('seo_type')?.value||'howto';
    const scoreEl=document.getElementById('seo_score');
    const ratingEl=document.getElementById('seo_rating');
    const bdEl=document.getElementById('seo_breakdown');
    const sugEl=document.getElementById('seo_suggestions');
    if(!scoreEl||!title){if(scoreEl){scoreEl.innerText='—';if(ratingEl)ratingEl.innerText='Enter a title above';}return;}
    const t=title.toLowerCase(); let pts=0,maxPts=0,breakdown=[],suggestions=[];
    maxPts+=15;const len=title.length;
    if(len>=40&&len<=60){pts+=15;breakdown.push({label:'Length ('+len+' chars)',pts:15,max:15,note:'Ideal'});}
    else if(len>=30&&len<=70){pts+=10;breakdown.push({label:'Length ('+len+' chars)',pts:10,max:15,note:'Acceptable'});}
    else if(len<20){pts+=2;breakdown.push({label:'Length ('+len+' chars)',pts:2,max:15,note:'Too short'});suggestions.push('Title is too short — aim for 40–60 characters.');}
    else{pts+=5;breakdown.push({label:'Length ('+len+' chars)',pts:5,max:15,note:'Too long'});suggestions.push('Trim to under 65 characters.');}
    maxPts+=20;
    if(keyword){const kw=keyword;if(t.startsWith(kw)){pts+=20;breakdown.push({label:'Keyword placement',pts:20,max:20,note:'Keyword leads title'});}else if(t.indexOf(kw)<20){pts+=15;breakdown.push({label:'Keyword placement',pts:15,max:20,note:'Near start'});}else if(t.includes(kw)){pts+=8;breakdown.push({label:'Keyword placement',pts:8,max:20,note:'Found but not at start'});suggestions.push('Move "'+keyword+'" to the beginning of the title.');}else{pts+=0;breakdown.push({label:'Keyword placement',pts:0,max:20,note:'Not found'});suggestions.push('Include "'+keyword+'" in your title.');}}else{pts+=10;breakdown.push({label:'Keyword placement',pts:10,max:20,note:'No keyword entered'});}
    maxPts+=20;const triggers=['how','why','best','secret','truth','mistake','never','always','easy','fast','proven','ultimate','simple'];const found=triggers.filter(w=>t.includes(w));const trigPts=Math.min(20,found.length*7);pts+=trigPts;breakdown.push({label:'Power words',pts:trigPts,max:20,note:found.length>0?found.slice(0,3).join(', '):'None found'});if(found.length===0)suggestions.push('Add a power word like "Ultimate", "Proven", or "Best".');
    maxPts+=10;const hasNum=/\d/.test(title);if(hasNum){pts+=10;breakdown.push({label:'Numbers',pts:10,max:10,note:'Numbers boost CTR'});}else{breakdown.push({label:'Numbers',pts:0,max:10,note:'No numbers'});suggestions.push('Add a specific number (e.g. "7 Ways", "in 30 Days").');}
    maxPts+=5;const hasYear=/202[3-9]|2030/.test(title);if(hasYear){pts+=5;breakdown.push({label:'Recency',pts:5,max:5,note:'Year increases relevance'});}else{breakdown.push({label:'Recency',pts:0,max:5,note:'No year — optional'});}
    maxPts+=15;pts+=15;const capsRatio=(title.match(/[A-Z]/g)||[]).length/Math.max(title.length,1);const hasBait=['you won\'t believe','mind blown','insane','impossible'].some(b=>t.includes(b));let baitPenalty=0;if(hasBait){baitPenalty+=10;suggestions.push('Remove clickbait phrases — YouTube penalises these in search ranking.');}if(capsRatio>0.5){baitPenalty+=5;suggestions.push('Too many capitals. Use title case instead.');}baitPenalty=Math.min(15,baitPenalty);pts-=baitPenalty;breakdown.push({label:'Clickbait risk',pts:15-baitPenalty,max:15,note:baitPenalty>0?'-'+baitPenalty+' penalty':'Clean'});
    const score=Math.max(0,Math.min(100,Math.round((pts/maxPts)*100)));scoreEl.innerText=score;
    let rating,rColor;if(score>=85){rating='Excellent';rColor='var(--success)';}else if(score>=70){rating='Good';rColor='var(--primary)';}else if(score>=55){rating='Average';rColor='var(--warning)';}else if(score>=40){rating='Weak';rColor='#fb923c';}else{rating='Poor';rColor='var(--danger)';}
    if(ratingEl){ratingEl.innerText=rating+' — '+score+' / 100';ratingEl.style.color=rColor;}scoreEl.style.color=rColor;
    if(bdEl)bdEl.innerHTML=breakdown.map(b=>{const pct=Math.max(0,(b.pts/b.max)*100);const col=pct>=80?'var(--success)':pct>=50?'var(--warning)':'var(--danger)';return '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:11px;"><span>'+b.label+'<br><span style="color:var(--text-muted);">'+b.note+'</span></span><span style="color:'+col+';font-weight:700;">'+(b.pts>=0?'+':'')+b.pts+' / '+b.max+'</span></div>';}).join('')+'<div style="display:flex;justify-content:space-between;padding:6px 0;font-weight:700;font-size:12px;"><span>Total</span><span style="color:'+rColor+';">'+score+' / 100</span></div>';
    if(sugEl)sugEl.innerHTML=suggestions.length>0?'<div style="margin-top:8px;"><div style="font-size:11px;font-weight:700;color:var(--text-dim);margin-bottom:8px;">Improvements</div>'+suggestions.map(s=>'<div style="background:var(--primary-dim);border-left:2px solid var(--primary);border-radius:var(--radius);padding:8px 10px;margin-bottom:6px;font-size:11px;line-height:1.65;">'+s+'</div>').join('')+'</div>':'<div style="margin-top:8px;font-size:12px;color:var(--success);">✅ Strong title.</div>';
  }


  function scoreSaturation() {
    const topic    = (document.getElementById('sat_topic')?.value    || '').trim();
    const angle    = (document.getElementById('sat_angle')?.value    || '').trim();
    const category = document.getElementById('sat_category')?.value  || 'lifestyle';
    const volume   = document.getElementById('sat_volume')?.value    || 'medium';
    const resEl    = document.getElementById('sat_result');
    if (!resEl || topic.length < 2) { if (resEl) resEl.innerText = 'Enter a topic above to see saturation analysis.'; return; }

    // Base saturation by category (inherent competition level)
    const catSat = {fitness:75,finance:80,tech:70,education:60,beauty:72,food:65,travel:68,business:78,entertainment:55,lifestyle:50};
    let baseSat = catSat[category] || 60;

    // Volume adjustment
    const volAdj = {low:-20, medium:0, high:20, extreme:35};
    baseSat += (volAdj[volume] || 0);

    // Angle uniqueness \\u2014 more specific angle = lower effective saturation
    let angleBonus = 0;
    const angleWords = angle.toLowerCase().split(/\\\\s+/).filter(w => w.length > 2);
    if (angleWords.length >= 4) angleBonus = 25; // very specific niche
    else if (angleWords.length >= 2) angleBonus = 15;
    else if (angleWords.length >= 1) angleBonus = 8;
    const effectiveSat = Math.max(5, Math.min(98, baseSat - angleBonus));

    // Topic-specific signals
    const genericTerms = ['how to','tips','best','guide','tutorial','for beginners','explained'];
    const isGeneric = genericTerms.some(g => topic.toLowerCase().includes(g));
    if (isGeneric) baseSat += 10; // generic framing = more competition

    let sc, level, recommendation, gapAnalysis;
    if (effectiveSat >= 80) {
      sc = 'var(--danger)'; level = 'Extremely Saturated';
      recommendation = 'This topic angle has very high competition. Entering now requires either a significantly differentiated production quality or a hyper-specific micro-niche.';
      gapAnalysis = angle ? 'Your angle (\\"' + angle + '\\") is a start, but more specificity is needed. Try: who is the audience, what problem are they solving, what result do they want, and what has failed for them before. Combine all four into your angle.' : 'Add a specific angle \\u2014 without one, you are competing on equal footing with thousands of existing videos.';
    } else if (effectiveSat >= 60) {
      sc = 'var(--warning)'; level = 'Competitive';
      recommendation = 'Competitive but viable. Success here requires above-average thumbnail and title game, consistent upload cadence, and strong on-camera presence or production quality.';
      gapAnalysis = angle ? '\\"' + angle + '\\" differentiates you from the broad topic. Focus your first 10 videos tightly on this angle to build topical authority before expanding.' : 'Add a specific angle to reduce your effective competition pool.';
    } else if (effectiveSat >= 40) {
      sc = 'var(--primary)'; level = 'Moderate \\u2014 Viable Gap';
      recommendation = 'Good opportunity. The topic has enough search demand to be worthwhile but is not so saturated that new channels cannot break through.';
      gapAnalysis = angle ? 'Your angle gives you a meaningful gap. Build topical authority by covering all sub-topics under \\"' + topic + '\\" from the \\"' + angle + '\\" perspective.' : 'This is a good space to enter. Adding a specific angle will further reduce competition.';
    } else {
      sc = 'var(--success)'; level = 'Low Saturation \\u2014 Early Opportunity';
      recommendation = 'Very low competition for this angle. Either it is genuinely underserved (strong opportunity) or there is insufficient search demand \\u2014 validate that people are actually searching for this before committing.';
      gapAnalysis = 'Validate demand: search the topic on YouTube and check whether existing videos have significant views (100K+). If they do, this is an excellent entry point. If existing videos have very few views, the demand may not be there.';
    }

    resEl.innerHTML = '<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;\\">'
      + '<div style=\\"text-align:center;background:' + sc + '18;border:1px solid ' + sc + ';border-radius:var(--radius);padding:16px;\\">'
      + '<div style=\\"font-size:2.5rem;font-weight:900;color:' + sc + ';\\">' + effectiveSat + '%</div>'
      + '<div style=\\"font-size:12px;font-weight:700;color:' + sc + ';\\">' + level + '</div>'
      + '<div style=\\"font-size:10px;color:var(--text-muted);margin-top:4px;\\">Effective saturation with your angle</div>'
      + '</div>'
      + '<div style=\\"background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;font-size:12px;line-height:1.75;\\">'
      + '<strong style=\\"color:var(--text-bright);\\">Category baseline:</strong> ' + (catSat[category]||60) + '% &nbsp;\\u00b7&nbsp; '
      + '<strong>Volume:</strong> ' + volume + '<br>'
      + '<strong>Angle specificity:</strong> ' + (angleBonus > 0 ? ('\\u2212' + angleBonus + '% competition reduction') : 'None \\u2014 add an angle to differentiate') + '<br>'
      + (isGeneric ? '<strong style=\\"color:var(--warning);\\">Generic framing detected</strong> \\u2014 consider a more specific angle.' : '')
      + '</div>'
      + '</div>'
      + '<div style=\\"background:var(--card2);border-left:3px solid ' + sc + ';border-radius:var(--radius);padding:12px;font-size:12px;line-height:1.75;margin-bottom:10px;\\">'
      + '<strong style=\\"color:' + sc + ';\\">Assessment:</strong> ' + recommendation + '</div>'
      + '<div style=\\"background:var(--primary-dim);border-left:3px solid var(--primary);border-radius:var(--radius);padding:12px;font-size:12px;line-height:1.75;\\">'
      + '<strong style=\\"color:var(--primary);\\">Gap Analysis:</strong> ' + gapAnalysis + '</div>';
  }


  function interpretRetention() {
    const s30  = parseFloat(document.getElementById('rc_30s')?.value)   || 0;
    const m1   = parseFloat(document.getElementById('rc_1min')?.value)  || 0;
    const p25  = parseFloat(document.getElementById('rc_25pct')?.value) || 0;
    const p50  = parseFloat(document.getElementById('rc_50pct')?.value) || 0;
    const p75  = parseFloat(document.getElementById('rc_75pct')?.value) || 0;
    const p90  = parseFloat(document.getElementById('rc_90pct')?.value) || 0;
    const avd  = parseFloat(document.getElementById('rc_avd')?.value)   || 0;
    const len  = parseFloat(document.getElementById('rc_length')?.value) || 10;
    const el   = document.getElementById('rc_result');
    if (!el) return;

    const hasData = s30 > 0 || m1 > 0 || p25 > 0 || p50 > 0 || p75 > 0;
    if (!hasData) { el.style.display = 'none'; return; }
    el.style.display = 'block';

    let diagnoses = [];
    let actions   = [];
    let overall   = '';
    let overallColor = 'var(--primary)';

    // Hook drop analysis (0 to 30s)
    if (s30 > 0) {
      if (s30 < 40) {
        diagnoses.push({ label:'Critical Hook Drop', color:'var(--danger)', desc:'Retention falls to ' + s30 + '% in the first 30 seconds. Over 60% of viewers left almost immediately \\u2014 the opening did not deliver on the thumbnail\\\'s promise.' });
        actions.push('Start with the payoff, not the setup. Show the end result in the first 5 seconds, then explain how you got there.', 'Cut your intro entirely \\u2014 go straight into the content.', 'Check that your thumbnail and title accurately represent what the video delivers. Misalignment causes immediate drop-off.');
      } else if (s30 < 60) {
        diagnoses.push({ label:'Moderate Hook Drop', color:'var(--warning)', desc:'Retention at ' + s30 + '% by 30 seconds. Some drop-off is normal \\u2014 this suggests the hook is partially working but not maximally compelling.' });
        actions.push('Tighten the first 30 seconds \\u2014 every sentence should either hook, promise, or deliver.', 'Add a pattern interrupt (unexpected visual, sound, or statement) in the first 10 seconds.');
      } else {
        diagnoses.push({ label:'Strong Hook', color:'var(--success)', desc:'Retention at ' + s30 + '% after 30 seconds \\u2014 excellent. Your opening is successfully retaining the majority of viewers.' });
      }
    }

    // Early drop 30s to 1min
    if (s30 > 0 && m1 > 0) {
      const earlyDrop = s30 - m1;
      if (earlyDrop > 25) {
        diagnoses.push({ label:'Sharp Drop: 30s\\u20131min', color:'var(--danger)', desc:'Lost ' + earlyDrop + '% of viewers between 30s and 1 min. Your content after the hook is not matching the energy or promise of the opening.' });
        actions.push('Review the 30\\u201360 second mark. If you transition into slow setup or talking-head explanation here, replace it with direct content delivery or a second hook/promise.');
      } else if (earlyDrop > 12) {
        diagnoses.push({ label:'Moderate Early Drop', color:'var(--warning)', desc:'Lost ' + earlyDrop + '% between 30s and 1 min \\u2014 above average. Consider what happens structurally at this point.' });
      }
    }

    // Mid-video analysis
    if (p25 > 0 && p50 > 0) {
      const midDrop = p25 - p50;
      const expectedDrop = (100 - (avd || 50)) * 0.4;
      if (midDrop > expectedDrop + 15) {
        diagnoses.push({ label:'Mid-Video Sag', color:'var(--warning)', desc:'Dropped ' + midDrop + '% between the 25% and 50% points \\u2014 more than expected. Viewers are losing interest in the middle section.' });
        actions.push('Add a \\"pattern interrupt\\" at the midpoint \\u2014 a new angle, a visual change, a bold statement, or a preview of what\\\'s coming.', 'Break long explanations into shorter segments with visual proof or examples.', 'Consider whether the middle section is actually necessary. Cut ruthlessly.');
      } else if (midDrop < 5) {
        diagnoses.push({ label:'Locked-In Midpoint', color:'var(--success)', desc:'Only ' + midDrop + '% drop from 25% to 50% point \\u2014 audience is locked in. This is a strong signal that the content is genuinely engaging in the middle.' });
      }
    }

    // End retention
    if (p75 > 0 && p90 > 0) {
      const endDrop = p75 - p90;
      if (p90 > 30) {
        diagnoses.push({ label:'Strong Completion', color:'var(--success)', desc:p90 + '% retention at the 90% mark \\u2014 excellent. End-screen CTR and subscribe prompts placed here will convert well.' });
        actions.push('Your end screen placement is in a high-retention zone. Make sure your CTA and subscribe prompt appear here.');
      } else if (p90 < 15) {
        diagnoses.push({ label:'End-Video Cliff', color:'var(--warning)', desc:'Only ' + p90 + '% retention at 90% \\u2014 most viewers have already left before the end. Your conclusion may be too slow or too long.' });
        actions.push('End the video earlier \\u2014 if retention is falling off before the 90% mark, the content has already run its natural course.', 'Move your CTA and end screen to the 75\\u201380% mark where retention is higher.');
      }
    }

    // Overall curve shape
    if (avd > 0) {
      if (avd >= 50) { overall = 'Strong overall retention (' + avd + '% AVD). This curve indicates content that satisfies viewers throughout.'; overallColor = 'var(--success)'; }
      else if (avd >= 35) { overall = 'Average retention (' + avd + '% AVD). This is within normal range for the platform but there is clear room for improvement.'; overallColor = 'var(--warning)'; }
      else { overall = 'Below average retention (' + avd + '% AVD). The curve is signalling that content or pacing improvements are needed across the video.'; overallColor = 'var(--danger)'; }
    }

    // Render
    const diagHtml = diagnoses.map(d =>
      '<div style=\\"background:' + d.color + '18;border-left:3px solid ' + d.color + ';border-radius:var(--radius);padding:10px 12px;margin-bottom:8px;font-size:12px;line-height:1.7;\\">'
      + '<strong style=\\"color:' + d.color + ';\\">' + d.label + '</strong><br>' + d.desc + '</div>'
    ).join('');

    const actHtml = actions.length > 0
      ? '<div style=\\"margin-top:14px;\\"><h4 style=\\"font-size:12px;font-weight:700;color:var(--primary);margin-bottom:8px;\\">Specific Fixes</h4>'
        + actions.map(a => '<div style=\\"background:var(--primary-dim);border-left:2px solid var(--primary);border-radius:var(--radius);padding:8px 10px;margin-bottom:6px;font-size:11px;line-height:1.65;color:var(--text);\\">\\u2192 ' + a + '</div>').join('')
        + '</div>'
      : '';

    el.innerHTML = (overall ? '<div style=\\"background:' + overallColor + '18;border:1px solid ' + overallColor + ';border-radius:var(--radius);padding:12px;font-size:13px;font-weight:600;color:var(--text);margin-bottom:14px;\\">' + overall + '</div>' : '')
      + '<h4 style=\\"font-size:12px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;\\">Curve Analysis</h4>'
      + (diagHtml || '<div style=\\"font-size:12px;color:var(--text-dim);\\">Add more data points above for a detailed analysis.</div>')
      + actHtml;
  }


  function calcEndScreen() {
    const lenMins = parseFloat(document.getElementById('es_length')?.value)      || 10;
    const avd     = parseFloat(document.getElementById('es_avd')?.value)         || 0;
    const mid     = parseFloat(document.getElementById('es_mid')?.value)         || 0;
    const r70     = parseFloat(document.getElementById('es_70')?.value)          || 0;
    const r80     = parseFloat(document.getElementById('es_80')?.value)          || 0;
    const r90     = parseFloat(document.getElementById('es_90')?.value)          || 0;
    const dropoff = parseFloat(document.getElementById('es_dropoff')?.value)     || 0;
    const curCtr  = parseFloat(document.getElementById('es_current_ctr')?.value) || 0;
    const el      = document.getElementById('es_result');
    if (!el) return;

    const hasData = avd > 0 || r70 > 0 || r80 > 0 || r90 > 0;
    if (!hasData) { el.style.display = 'none'; return; }
    el.style.display = 'block';

    // YouTube end screen must be in last 20 seconds
    const lenSecs      = lenMins * 60;
    const endScreenStart = Math.max(lenSecs - 20, 25); // minimum 25s into video
    const endScreenStartMin = (endScreenStart / 60).toFixed(2).replace('.', ':').padStart(5, '0');

    // Find optimal end screen placement based on retention
    let optimalPlacement, placementReason, placementColor;

    // Strategy: place end screen where retention is highest within the last 20 seconds
    // Use r80 as proxy for the ~80% timestamp which = 20% before end for most videos
    const retAt80pct = r80 || r70 || (avd * 1.1) || 0;
    const retAtEnd   = r90 || (retAt80pct * 0.7);

    if (r80 > 0 && r90 > 0) {
      const dropInEnd = r80 - r90;
      if (dropInEnd < 5) {
        // Flat retention near end \\u2014 place at 80% mark
        const minAt80 = (lenMins * 0.80).toFixed(1);
        optimalPlacement = 'Place end screen at ' + minAt80 + ' min \\u2014 retention is stable here (' + r80 + '% \\u2192 ' + r90 + '%). Viewers who are still watching at this point have high intent to click.';
        placementReason = 'Flat curve in the final section means your audience is committed. Strike while they are engaged.';
        placementColor = 'var(--success)';
      } else if (dropInEnd > 20) {
        // Sharp cliff \\u2014 end screen needs to start before the drop
        const minBefore = (lenMins * 0.78).toFixed(1);
        optimalPlacement = 'Move end screen earlier, starting at ' + minBefore + ' min \\u2014 there is a ' + dropInEnd + '% drop between 80% and 90% of the video. Most viewers have already left by the time end screens appear.';
        placementReason = 'A sharp drop in this zone means your current end screen is showing to an already-departed audience. Earlier placement catches more viewers.';
        placementColor = 'var(--warning)';
      } else {
        const minAt80 = (lenMins * 0.82).toFixed(1);
        optimalPlacement = 'End screen at ' + minAt80 + ' min is appropriate. Moderate drop (' + dropInEnd + '%) \\u2014 most committed viewers are still present.';
        placementReason = 'Typical decay. Your end screen window contains good retention.';
        placementColor = 'var(--primary)';
      }
    } else if (avd > 0) {
      // Estimate from AVD alone
      const estRetentionAtEnd = Math.max(10, avd * 0.6);
      const recMin = (lenMins * 0.82).toFixed(1);
      optimalPlacement = 'Based on your ' + avd + '% AVD, approximately ' + estRetentionAtEnd.toFixed(0) + '% of viewers reach the final 20%. Place end screen at ' + recMin + ' min as a starting point.';
      placementReason = 'Enter exact retention values above for a more precise recommendation.';
      placementColor = 'var(--text-dim)';
    } else {
      optimalPlacement = 'Add retention data above to get a placement recommendation.';
      placementReason = '';
      placementColor = 'var(--text-muted)';
    }

    // Drop-off zone warning
    let dropWarning = '';
    if (dropoff > 0) {
      const dropMins = dropoff.toFixed(1);
      const dropPct  = ((dropoff / lenMins) * 100).toFixed(0);
      if (dropoff > lenMins * 0.7) {
        dropWarning = '<div style=\\"background:var(--warning-dim);border-left:3px solid var(--warning);border-radius:var(--radius);padding:10px 12px;font-size:12px;line-height:1.7;margin-bottom:10px;\\">'
          + '<strong style=\\"color:var(--warning);\\">Drop-off at ' + dropMins + ' min (' + dropPct + '% through)</strong> \\u2014 this is in your end screen zone. '
          + 'Viewers are leaving near your end screen, which limits clicks. Consider: (1) shortening the video so the drop-off falls after the end screen, or (2) placing a pattern interrupt at ' + dropMins + ' min before the drop happens.'
          + '</div>';
      } else {
        dropWarning = '<div style=\\"background:var(--primary-dim);border-left:3px solid var(--primary);border-radius:var(--radius);padding:10px 12px;font-size:12px;line-height:1.7;margin-bottom:10px;\\">'
          + '<strong style=\\"color:var(--primary);\\">Drop-off at ' + dropMins + ' min</strong> \\u2014 this is in the middle of the video, not in the end screen zone. '
          + 'Place a card here to re-engage viewers before they leave. A \\"continue watching\\" related video card at this exact moment can recover some of the drop-off.'
          + '</div>';
      }
    }

    // CTR assessment
    let ctrNote = '';
    if (curCtr > 0) {
      if      (curCtr >= 10) ctrNote = '<div style=\\"color:var(--success);font-size:12px;\\">\\u2705 End screen CTR (' + curCtr + '%) is excellent \\u2014 your placement and video suggestions are working well.</div>';
      else if (curCtr >= 5)  ctrNote = '<div style=\\"color:var(--primary);font-size:12px;\\">\\ud83d\\udcca End screen CTR (' + curCtr + '%) is good. Benchmark is 4\\u20138% \\u2014 you are in the healthy range.</div>';
      else if (curCtr >= 2)  ctrNote = '<div style=\\"color:var(--warning);font-size:12px;\\">\\u26a0 End screen CTR (' + curCtr + '%) is below average. Check: (1) Is the end screen appearing while viewers are still present? (2) Are the suggested videos closely related? (3) Is your verbal CTA matching the screen content?</div>';
      else                   ctrNote = '<div style=\\"color:var(--danger);font-size:12px;\\">\\u26a0 End screen CTR (' + curCtr + '%) is very low. The end screen is likely showing after most viewers have left, or the suggested content is not compelling. Try the timing recommendations below.</div>';
    }

    // Element count recommendation
    const estRemaining = r90 > 0 ? r90 : (avd > 0 ? avd * 0.6 : 20);
    let elementRec = '';
    if (estRemaining > 40)      elementRec = 'You have strong retention near the end \\u2014 use all 4 end screen elements: <strong>Subscribe button + 2 related videos + 1 playlist</strong>.';
    else if (estRemaining > 20) elementRec = 'Moderate end retention \\u2014 use <strong>Subscribe button + 1 related video + 1 playlist</strong>. Less clutter improves per-element CTR.';
    else                        elementRec = 'Low end retention \\u2014 keep it simple: <strong>Subscribe button + 1 best-performing video</strong>. Fewer elements with more visual prominence.';

    el.innerHTML = dropWarning
      + '<div style=\\"background:' + placementColor + '18;border-left:3px solid ' + placementColor + ';border-radius:var(--radius);padding:12px 14px;font-size:12px;line-height:1.8;margin-bottom:10px;\\">'
      + '<strong style=\\"color:' + placementColor + ';\\">End Screen Placement</strong><br>'
      + optimalPlacement
      + (placementReason ? '<br><em style=\\"color:var(--text-dim);\\">' + placementReason + '</em>' : '')
      + '</div>'
      + (ctrNote ? ctrNote + '<br>' : '')
      + '<div style=\\"background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:12px;font-size:12px;line-height:1.8;margin-bottom:10px;\\">'
      + '<strong style=\\"color:var(--text-bright);\\">Element Recommendation</strong><br>' + elementRec
      + '</div>'
      + '<div style=\\"background:var(--accent-dim);border-left:3px solid var(--accent);border-radius:var(--radius);padding:10px 12px;font-size:12px;line-height:1.75;\\">'
      + '<strong style=\\"color:var(--accent);\\">Verbal CTA tip:</strong> Say \\"click that video right there\\" while pointing at your end screen overlay \\u2014 videos with a matching verbal CTA get 40\\u201360% higher end screen CTR than silent end screens. Time the verbal mention 3\\u20135 seconds before the end screen appears so the viewer\\\'s eye is ready.'
      + '</div>';

    calcCards();
  }


  function calcCards() {
    const lenMins   = parseFloat(document.getElementById('es_length')?.value)      || 10;
    const dropoff   = parseFloat(document.getElementById('es_dropoff')?.value)     || 0;
    const rewatch   = parseFloat(document.getElementById('es_rewatch')?.value)     || 0;
    const highStart = parseFloat(document.getElementById('es_high_start')?.value)  || 0;
    const highEnd   = parseFloat(document.getElementById('es_high_end')?.value)    || 0;
    const goal      = document.getElementById('es_card_goal')?.value               || 'related';
    const el        = document.getElementById('card_result');
    if (!el) return;

    const goalLabels = { related:'related video', playlist:'playlist', external:'external link', subscribe:'subscribe prompt' };
    const goalLabel = goalLabels[goal] || 'card';

    let placements = [];

    // Rewatch spike = best card placement (viewer is engaged enough to replay)
    if (rewatch > 0) {
      placements.push({ time: rewatch.toFixed(1) + ' min', reason: 'Rewatch spike \\u2014 this is your highest-engagement moment. Viewers rewatching signals the content is compelling. A ' + goalLabel + ' here has the highest intent.', color: 'var(--success)', priority: 1 });
    }

    // High retention flat section = second best placement
    if (highStart > 0 && highEnd > 0) {
      const mid = ((highStart + highEnd) / 2).toFixed(1);
      placements.push({ time: mid + ' min (in ' + highStart + '\\u2013' + highEnd + ' min flat zone)', reason: 'Middle of your highest-retention section. Viewers here are actively engaged and least likely to dismiss the card.', color: 'var(--primary)', priority: 2 });
    }

    // Before drop-off = recovery card
    if (dropoff > 0 && dropoff < lenMins * 0.75) {
      const before = Math.max(0, dropoff - 0.5).toFixed(1);
      placements.push({ time: before + ' min (30s before your ' + dropoff.toFixed(1) + ' min drop-off)', reason: 'Place a ' + goalLabel + ' just before your biggest drop-off point. This gives leaving viewers a destination rather than having them close the tab.', color: 'var(--warning)', priority: 3 });
    }

    // Standard early placement for awareness
    const earlyTime = Math.max(0.2, lenMins * 0.25).toFixed(1);
    placements.push({ time: earlyTime + ' min', reason: 'Early-video placement for viewers who might not finish. Lower intent but higher volume \\u2014 good for playlist promotion to get viewers into a series.', color: 'var(--text-dim)', priority: 4 });

    placements.sort((a,b) => a.priority - b.priority);

    el.innerHTML = placements.length > 0
      ? '<div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-dim);margin-bottom:8px;\\">Recommended Card Placements</div>'
        + placements.slice(0,4).map((p,i) =>
            '<div style=\\"display:flex;gap:10px;align-items:flex-start;background:' + p.color + '15;border-left:2px solid ' + p.color + ';border-radius:var(--radius);padding:8px 10px;margin-bottom:6px;\\">'
            + '<span style=\\"font-weight:800;color:' + p.color + ';min-width:18px;\\">' + (i+1) + '</span>'
            + '<div><div style=\\"font-weight:700;color:' + p.color + ';font-size:12px;\\">' + p.time + '</div><div style=\\"font-size:11px;color:var(--text);line-height:1.65;\\">' + p.reason + '</div></div>'
            + '</div>'
          ).join('')
        + '<div style=\\"margin-top:8px;font-size:11px;color:var(--text-muted);\\">Max 5 cards per video. Each card shows for 5 seconds. Avoid placing multiple cards within 30 seconds of each other \\u2014 they cancel each other out.</div>'
      : '<div style=\\"font-size:12px;color:var(--text-dim);\\">Add retention data to get card placement recommendations.</div>';
  }


  function calcROI() {
    const sViews   = parseFloat(document.getElementById('roi_shorts_views')?.value)  || 0;
    const sTime    = parseFloat(document.getElementById('roi_shorts_time')?.value)   || 2;
    const sFollow  = parseFloat(document.getElementById('roi_shorts_follow')?.value) || 0.3;
    const lfViews  = parseFloat(document.getElementById('roi_lf_views')?.value)      || 0;
    const lfTime   = parseFloat(document.getElementById('roi_lf_time')?.value)       || 8;
    const lfFollow = parseFloat(document.getElementById('roi_lf_follow')?.value)     || 1.5;
    const lfAvd    = parseFloat(document.getElementById('roi_lf_avd')?.value)        || 5;
    const rpm      = parseFloat(document.getElementById('roi_rpm')?.value)           || 3;
    const el       = document.getElementById('roi_result');
    if (!el || (sViews === 0 && lfViews === 0)) { if (el) el.innerText = 'Enter stats above to compare ROI.'; return; }

    // Shorts: no AdSense for most, minimal watch hours, good for discovery
    const sRevenue   = 0; // Shorts RPM is effectively 0 for most creators
    const sSubsGained= sViews * (sFollow / 100);
    const sWatchHrs  = sViews * (0.5 / 60); // ~30s avg for Shorts
    const sROI       = { revenue: sRevenue, subs: sSubsGained, watchHrs: sWatchHrs, perHour: sSubsGained / sTime };

    // Long-form: AdSense revenue + watch hours + higher sub conversion
    const lfRevenue  = (lfViews / 1000) * rpm;
    const lfSubsGained = lfViews * (lfFollow / 100);
    const lfWatchHrs = lfViews * (lfAvd / 60);
    const lfROI      = { revenue: lfRevenue, subs: lfSubsGained, watchHrs: lfWatchHrs, perHour: lfSubsGained / lfTime };

    const subWinner  = sROI.perHour > lfROI.perHour ? 'Shorts' : 'Long-form';
    const revWinner  = 'Long-form'; // Always for monetised channels
    const watchWinner= lfROI.watchHrs > sROI.watchHrs ? 'Long-form' : 'Shorts';

    el.innerHTML = '<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;\\">'
      + ['Shorts','Long-form'].map((label, idx) => {
          const d = idx === 0 ? sROI : lfROI;
          const col = idx === 0 ? 'var(--secondary)' : 'var(--primary)';
          return '<div style=\\"background:' + col + '12;border:1px solid ' + col + ';border-radius:var(--radius-lg);padding:14px;\\">'
            + '<div style=\\"font-weight:700;color:' + col + ';margin-bottom:10px;\\">' + (idx === 0 ? '\\ud83d\\udcf1 ' : '\\ud83c\\udfac ') + label + '</div>'
            + '<div style=\\"font-size:12px;line-height:1.9;\\">'
            + 'Revenue/video: <strong>$' + d.revenue.toFixed(2) + '</strong><br>'
            + 'Subs gained: <strong>' + Math.round(d.subs).toLocaleString() + '</strong><br>'
            + 'Watch hrs: <strong>' + d.watchHrs.toFixed(1) + ' hrs</strong><br>'
            + 'Subs/prod-hr: <strong>' + d.perHour.toFixed(2) + '</strong>'
            + '</div></div>';
        }).join('')
      + '</div>'
      + '<div style=\\"background:var(--card2);border-radius:var(--radius);padding:12px;font-size:12px;line-height:1.9;\\">'
      + '\\ud83c\\udfc6 <strong>Subscribers per production hour:</strong> ' + subWinner + ' wins (' + (subWinner === 'Shorts' ? sROI.perHour.toFixed(2) : lfROI.perHour.toFixed(2)) + ' subs/hr)<br>'
      + '\\ud83c\\udfc6 <strong>Revenue:</strong> Long-form wins (Shorts earns ~$0 AdSense for most creators)<br>'
      + '\\ud83c\\udfc6 <strong>Watch hours (YPP):</strong> ' + watchWinner + ' wins<br>'
      + '<div style=\\"margin-top:10px;padding-top:8px;border-top:1px solid var(--border);color:var(--text-dim);\\">\\ud83d\\udca1 <strong>Recommendation:</strong> '
      + (lfViews > sViews * 5 ? 'Long-form is significantly outperforming Shorts in absolute views. Double down on long-form.' :
         sROI.perHour > lfROI.perHour * 1.5 ? 'Shorts is generating subscribers more efficiently per production hour \\u2014 use Shorts for discovery and long-form for monetisation.' :
         'Both formats are contributing. Use Shorts for top-of-funnel discovery and long-form for revenue and watch-hour accumulation. Aim for 1 long-form per 3\\u20135 Shorts.')
      + '</div></div>';
  }


  function calcSchedule() {
    const tz     = document.getElementById('sch_tz')?.value     || 'us_east';
    const niche  = document.getElementById('sch_niche')?.value  || 'entertainment';
    const freq   = parseInt(document.getElementById('sch_freq')?.value)  || 1;
    const format = document.getElementById('sch_format')?.value || 'longform';
    const el     = document.getElementById('sch_result');
    if (!el) return;

    // Best upload windows by niche (local time for the audience timezone)
    const nicheWindows = {
      gaming:       [{day:'Thu',time:'4pm\u20137pm',note:'After school/work, pre-evening gaming session'},{day:'Sat',time:'11am\u20132pm',note:'Peak weekend gaming hours'},{day:'Fri',time:'5pm\u20138pm',note:'Friday gaming surge'}],
      finance:      [{day:'Mon',time:'7am\u20139am',note:'Commute \u2014 money mindset Monday'},{day:'Wed',time:'6am\u20138am',note:'Mid-week planning mindset'},{day:'Sun',time:'8am\u201311am',note:'Weekend research and planning'}],
      fitness:      [{day:'Mon',time:'5am\u20138am',note:'Motivation Monday \u2014 peak intent'},{day:'Wed',time:'6am\u20139am',note:'Mid-week consistency audience'},{day:'Sat',time:'8am\u201310am',note:'Weekend workout planners'}],
      education:    [{day:'Sun',time:'7pm\u201310pm',note:'Pre-week study prep'},{day:'Tue',time:'4pm\u20137pm',note:'After school / work study sessions'},{day:'Thu',time:'7pm\u20139pm',note:'End-of-week studying surge'}],
      beauty:       [{day:'Sat',time:'10am\u20131pm',note:'Weekend beauty routine planning'},{day:'Tue',time:'6pm\u20139pm',note:'Weeknight browse peak'},{day:'Sun',time:'2pm\u20135pm',note:'Afternoon inspiration browse'}],
      food:         [{day:'Sun',time:'11am\u20132pm',note:'Meal prep planning peak'},{day:'Wed',time:'5pm\u20137pm',note:'Weeknight dinner inspiration'},{day:'Fri',time:'4pm\u20137pm',note:'Weekend cooking planning'}],
      tech:         [{day:'Tue',time:'12pm\u20133pm',note:'Tech news lunch hour'},{day:'Thu',time:'6pm\u20139pm',note:'Evening tech browse'},{day:'Sat',time:'11am\u20132pm',note:'Weekend product research'}],
      entertainment:[{day:'Thu',time:'6pm\u20139pm',note:'Pre-weekend entertainment peak'},{day:'Sat',time:'1pm\u20135pm',note:'Weekend peak browse'},{day:'Fri',time:'5pm\u20139pm',note:'Friday evening entertainment surge'}],
      news:         [{day:'Mon',time:'7am\u20139am',note:'Monday news catch-up'},{day:'Wed',time:'7am\u20139am',note:'Mid-week news check'},{day:'Fri',time:'7am\u20139am',note:'End-of-week news review'}]
    };

    const windows = nicheWindows[niche] || nicheWindows.entertainment;

    // Timezone offset labels
    const tzLabels = {us_east:'Eastern Time (ET)',us_central:'Central Time (CT)',us_west:'Pacific Time (PT)',uk:'UK Time (GMT/BST)',eu_central:'Central European Time (CET)',au_east:'Australian Eastern (AEST)',india:'India Standard Time (IST)',global:'Your local time (mixed audience)'};
    const tzLabel = tzLabels[tz] || tz;

    // Frequency schedule
    let schedule = [];
    const allDays = windows.slice(0, Math.min(freq, windows.length));
    if (freq > windows.length) {
      const extras = ['Mon','Tue','Wed'].filter(d => !allDays.find(w => w.day === d));
      extras.slice(0, freq - windows.length).forEach(d => allDays.push({day:d, time:'6pm\u20139pm', note:'Added for frequency \u2014 match your niche\\\'s best performing day'}));
    }

    // Format-specific notes
    const fmtNote = format === 'shorts'
      ? 'For Shorts: upload 2\u20134 hours before these windows \u2014 Shorts needs time to seed in the algorithm before peak browse.'
      : format === 'mixed'
        ? 'Schedule long-form at these windows. Upload Shorts 2\u20134 hours earlier the same day to seed discovery before the long-form drops.'
        : 'Upload 30\u201360 minutes before the window opens so your video is indexed and thumbnail-tested before peak traffic arrives.';

    el.innerHTML = '<div style=\\"margin-bottom:14px;\\">'
      + '<div style=\\"font-size:11px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;\\">Recommended Upload Windows \u2014 ' + tzLabel + '</div>'
      + allDays.map(w =>
          '<div style=\\"display:flex;align-items:flex-start;gap:12px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:10px 14px;margin-bottom:8px;\\">'
          + '<div style=\\"min-width:36px;font-weight:800;font-size:13px;color:var(--accent);\\">' + w.day + '</div>'
          + '<div><div style=\\"font-weight:700;font-size:13px;color:var(--text-bright);\\">' + w.time + '</div><div style=\\"font-size:11px;color:var(--text-dim);\\">' + w.note + '</div></div>'
          + '</div>'
        ).join('')
      + '</div>'
      + '<div style=\\"background:var(--primary-dim);border-left:3px solid var(--primary);border-radius:var(--radius);padding:10px 12px;font-size:12px;line-height:1.75;color:var(--text);\\">'
      + '<strong style=\\"color:var(--primary);\\">Timing tip:</strong> ' + fmtNote + '</div>'
      + '<div style=\\"margin-top:10px;background:var(--card2);border-radius:var(--radius);padding:10px 12px;font-size:11px;color:var(--text-dim);line-height:1.75;\\">'
      + '\ud83d\udccc These windows are based on <strong>your audience\\\'s local time</strong>, not yours. The goal is for the video to appear at the top of feeds when your audience is most active on the platform. '
      + 'After 30 uploads, check your YouTube Analytics \u2192 Audience tab \u2192 \\"When your viewers are on YouTube\\" for your personalised peak hours.</div>';
  }


  function renderGoalPlanner() {
    const avdInput=parseFloat(document.getElementById('gp_avd')?.value)||0;
    const monthsSel=parseFloat(document.getElementById('gp_months')?.value)||0;
    const earned=parseFloat(document.getElementById('gp_earned')?.value)||0;
    const streamHrs=parseFloat(document.getElementById('gp_stream_hrs')?.value)||0;
    const streamViewers=parseFloat(document.getElementById('gp_stream_viewers')?.value)||0;
    const wrap=document.getElementById('gp_table_wrap');
    if(!wrap) return;
    const remaining=Math.max(0,4000-earned);
    const streamMoHrs=(streamHrs*streamViewers)*(30.5/7);
    const note=document.getElementById('gp_highlight_note');
    const sNoteEl=document.getElementById('gp_stream_note');
    if(sNoteEl){
      if(streamHrs>0&&streamViewers>0)sNoteEl.innerHTML='Streams add <strong style="color:var(--accent);">'+(streamHrs*streamViewers).toFixed(1)+' hrs/week</strong>';
      else sNoteEl.innerHTML='';
    }
    if(!avdInput&&!monthsSel){wrap.innerHTML='<div style="text-align:center;padding:32px;color:var(--text-muted);font-size:13px;">Select your AVD and months-to-goal to generate the table.</div>';if(note)note.innerHTML='';return;}
    const hiAvd=avdInput>0?[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10].reduce((a,b)=>Math.abs(b-avdInput)<Math.abs(a-avdInput)?b:a):null;
    const showM=[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13];
    const tv=hiAvd?Math.round(remaining*60/hiAvd):0;
    let html='<table style="border-collapse:separate;border-spacing:0;width:100%;font-size:12px;"><thead><tr><th style="padding:7px 10px;text-align:left;background:var(--card2);border:1px solid var(--border);min-width:90px;">Avg Watch</th><th style="padding:7px 10px;text-align:right;background:var(--card2);border:1px solid var(--border);min-width:90px;">Views Needed</th>';
    showM.forEach(m=>{const iT=monthsSel>0&&m===monthsSel;html+='<th colspan="2" style="padding:6px 6px;text-align:center;background:'+(iT?'var(--primary-dim)':'var(--card2)')+';border:1px solid var(--border);color:'+(iT?'var(--primary)':'var(--text-dim)')+';font-size:10px;white-space:nowrap;">'+m+'mo</th>';});
    html+='</tr></thead><tbody>';
    [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10].forEach(avd=>{
      const tvA=Math.round(remaining*60/avd);const isR=hiAvd&&avd===hiAvd;
      html+='<tr style="background:'+(isR?'var(--success-dim)':'inherit')+'"><td style="padding:7px 10px;border:1px solid var(--border);font-weight:'+(isR?700:400)+';color:'+(isR?'var(--success)':'var(--text)')+';">'+avd+' min</td><td style="padding:7px 10px;border:1px solid var(--border);text-align:right;color:var(--secondary);">'+tvA.toLocaleString()+'</td>';
      showM.forEach(m=>{
        const vpv=Math.round(tvA/(12*(m+1)));const daily=Math.round(tvA/(30.5*(m+1)));
        const iT=monthsSel>0&&m===monthsSel;const iStar=isR&&iT;
        const cs=iStar?'background:rgba(244,114,182,0.15);font-weight:800;':isR?'background:var(--success-dim);font-weight:700;':iT?'background:var(--primary-dim);font-weight:700;':'';
        html+='<td style="padding:7px 5px;border:1px solid var(--border);text-align:center;'+cs+'">'+vpv.toLocaleString()+'</td><td style="padding:7px 5px;border:1px solid var(--border);text-align:center;'+cs+'">'+daily.toLocaleString()+'</td>';
      });
      html+='</tr>';
    });
    html+='</tbody></table>';
    wrap.innerHTML=html;
    if(note&&hiAvd&&monthsSel){const tv2=Math.round(remaining*60/hiAvd);const v2=Math.round(tv2/(12*(monthsSel+1)));const d2=Math.round(tv2/(30.5*(monthsSel+1)));note.innerHTML='Views/vid: <strong style="color:var(--success);">'+v2.toLocaleString()+'</strong> · Daily: <strong style="color:var(--success);">'+d2.toLocaleString()+'</strong>';}else if(note)note.innerHTML='';
  }
