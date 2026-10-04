/* Narrative scenes are authored separately from the existing outcome rules. */
window.MEETING_STORY_EDITORIAL=(()=>{
 const N=window.MEETING_NARRATIVE_WORLD,P=N.pair,E=N.english,R=window.MEETING_ROUTE_STORIES,S=window.MEETING_SIDE_STORIES,A=window.MEETING_ACADEMIC_CONTENT,C=window.MEETING_CONTENT,Q=window.MEETING_EDITORIAL_SCENES;
 const arcs=Q.arcs,sides=Q.sides;
 for(const s of R.stories){s.scenes=arcs[s.id].map(x=>N.fragment(...x));s.synopsis=P(s.scenes[0].slice(0,s.scenes[0].indexOf('。')+1),()=>arcs[s.id][0][1].split('. ')[0]+'.');}
 for(const s of S.stories)s.scenes=sides[s.id].map(x=>N.fragment(...x));
 for(const s of A.campus)s.scenes=Q.campus[s.id].map(x=>N.fragment(...x));
 const shadows={
 email:['老师转来征集预告，正文只有“你看看”。附件里的截止日期还没定，标题倒写得很正式。你把邮件标了星，暂时没有回复是否参加。','The supervisor forwards a preview with a brief invitation to look. The deadline is unconfirmed and you star it without committing.','正式通知到了，截止比预告早了一周。老师问你上次看得怎么样，你翻出那封标星邮件，发现“看看”和“答应”之间一直没说清楚。','The final deadline is a week earlier. Asked about progress, you reopen the starred email and the gap between looking and committing.'],
 borrow:['同门问答辩能否借转接头，你随口说“到时问我”。对方回了一个感谢的表情，你也没继续解释，事情就这样被放到了下周。','A tentative offer to lend an adapter earns thanks and is left until next week.','同门背着答辩材料来找转接头，才说今天就要用。你也正要带电脑出门。两个人站在门口，发现之前那句“到时问我”理解得并不一样。','The defense is today, but you need the adapter too. The earlier tentative reply meant different things to each person.'],
 quote:['你说自己最熟悉的同事是进度条，老师笑着记在便签上。大家接着聊别的，没人想到这句话会去招生介绍里。','A progress-bar joke makes the supervisor laugh and take a note, without discussion of recruitment use.','招生介绍草稿里出现了你的自嘲，新人真来问组里是不是每天都在等。老师把草稿发给你，说发布前还可以改。','The joke appears in a recruitment draft. Newcomers ask whether the group spends every day waiting, and the draft can still be changed.'],
 table:['隔壁桌听见你的抱怨，说他们也卡过类似问题。吃完饭加了联系方式，双方都说下次聊，谁也没立刻发文件。','A dining-hall chat leads to contact details and plans to talk, without any immediate file exchange.','对方来问能否一起看一份材料，顺便带来上次聊过的例子。食堂里的随口一说，现在终于需要在日历上找一个位置。','The contact brings an example and asks for a joint reading; the casual promise now needs a calendar slot.'],
 failure:['老师觉得你那次没讲完的汇报适合课堂讨论，先问能否用几页。你还没想好，至少原稿里有些名字得先去掉。','The supervisor asks to use pages of the unfinished talk in class. You have not agreed and some names need removing.','课表排好了案例讨论，老师问你愿不愿意一起讲。原来最想藏起来的那几页，现在可能让新人少踩一次坑，也可能让你再尴尬一回。','A class discussion is scheduled and you are invited to co-present. The pages might help newcomers, or bring another awkward moment.']
 };
 for(const f of A.foreshadows){const a=shadows[f.id];f.intro=P(a[0],a[1]);f.reveal=P(a[2],a[3]);}
 const motives={
 paper:['他的桌上摊着修稿意见，最后两条还没回。问你能不能等一会儿时，眼睛仍停在那一页。','Two review comments remain unanswered on the desk; the request to wait comes without looking up.'],
 grant:['预算表已经改了三版，财务又退回来一个数字。手机隔几分钟亮一次，他说先把最急的那段问清。','The budget is on its third revision and finance has returned another figure. An urgent question fits between messages.'],
 teach:['下一节课快开始了，讲义还没印。愿意听你讲几分钟，长稿得等下课再说。','Class starts soon and handouts remain unprinted; a brief question fits now, a long draft must wait.'],
 family:['手机里有几条家里的消息没回。他说今天可能不能留太晚，没有接着讲原因。','Several family messages remain unanswered; today cannot run late, without further explanation.'],
 relationship:['今天已经约好见面，时间改过一次。他把电脑合了一半，笑着问你的问题能不能先讲最短的版本。','An already-rescheduled personal meeting leaves time for the shortest version of your question.'],
 job:['邮箱里同时开着申请表和面试通知，桌边放着准备寄出的材料。他也还不知道下一站在哪里。','Applications and interview invitations are open beside documents for posting; the next destination is undecided.'],
 rest:['连着几天赶截止，今天想按时离开。给你发了一个链接，说先看这页，长讨论明天再约。','After successive deadlines, leaving on time matters. A link is offered before arranging a longer discussion tomorrow.'],
 collaborate:['他带着一份新的分工草稿，愿意谈合作。讲到上一轮项目时停了一下，说这次最好先把各自做什么写清。','A new division-of-work draft accompanies a collaboration offer shaped by a difficult previous project.']
 };
 for(const g of window.MEETING_WORLD.goals)g.motive=P(...motives[g.id]);
 const opportunityNotes={workshop:['组织者临时补一个空席，问你今天能不能确认。日程上最想听的那场恰好排在午饭后。','An organizer needs a replacement attendee confirmed today; the most interesting session is after lunch.'],archive:['值班老师把最后入场时间圈了出来。你翻着目录，得决定先看哪几页。','The last admission time is circled while you choose which pages to see first.'],mentor:['访客的行李箱放在门边，离下一班车只剩一段时间。对方让你先讲最想问的那一个问题。','A visitor’s suitcase stands by the door; one question fits before the train.'],collab:['对方带来自己的草稿，里面也有没解决的问题。谈合作时，桌上同时放着两份截止安排。','Both parties bring unresolved drafts and separate deadlines to the collaboration discussion.'],poster:['展板还剩一个位置，组织者正在改参展名单。你若参加，就得这两天把版面做出来。','One poster slot remains and an accepted invitation needs a layout promptly.'],friend:['朋友问去哪儿，随后补一句“这次别又在路上改成讨论课题”。地点已经发到手机里。','A friend sends a location and asks that this outing not turn into another research discussion.']};
 for(const o of window.MEETING_WORLD.opportunities){const old=o.scene,tail=P(...opportunityNotes[o.id]);o.scene=P(old+' '+tail,()=>E(old)+' '+E(tail));}
 for(const o of window.MEETING_WORLD.channels){const old=o.scene,tail=P('邀请停在手机里，今天的日历还没有空出位置。','The invitation is on your phone, but the calendar has no space reserved yet.');o.scene=P(old+' '+tail,()=>E(old)+' '+E(tail));}
 const after={
 failure:P('你合上电脑，手还放在盖子上。走廊里已经有人开始聊晚饭，刚才没答上的那一句却仍在脑子里转。现在还不必替它想出一个漂亮的结尾。','You close the laptop but leave a hand on its lid. People in the corridor discuss dinner while the unanswered question stays with you. It needs no polished ending yet.'),
 funny:P('有人忍着笑把水杯拿远了一点。你原本想解释，想了想，又觉得这句话最好别再加第二句。走出房间时，群里已经有人发了一个表情。','Someone moves a water glass while suppressing laughter. You decide against a second explanation; an emoji has reached the group before you leave.'),
 open:P('投影关掉以后，墙面忽然白了一大块。你把笔记收进包里，有几页已经用不上，也有一页还想下次继续讲。门外的晚饭邀约终于可以回复了。','The switched-off projection leaves a blank wall. Some notes are finished, one page may return next time, and the dinner invitation can finally be answered.')
 };
 const epilogues=[
 [/degree-master|degree-doctor|graduation/,['桌面腾空以后，才发现几年前贴上去的便签已经褪色。离开的事情很多，第一件却是把借来的书还掉。','Clearing the desk reveals faded notes. Among the many leaving tasks, returning borrowed books comes first.']],
 [/delay|延期|overtime/,['日历上那个日期被划掉，旁边还没有写新的。你先把手机放下，去吃一顿被拖得太晚的饭。','The old date is crossed out without a replacement. You put down the phone and finally eat.']],
 [/collab|署名/,['稿件首页开着，光标停在作者名单里。最难写的一行原来不在正文，也没法靠调一下字号解决。','The cursor waits in the author list; the hardest line is outside the text and cannot be fixed by formatting.']],
 [/paper|journal|publication|稿|期刊/,['邮箱还开在那封信上，打印出来的意见夹进了草稿。你把原来那页目录翻回来，重新看了一遍文章最初想问的事情。','The email stays open and printed comments join the draft. You return to the outline and the question that began it.']],
 [/cat|猫/,['窗外有人轻轻喊了一声，猫没有理。学术讨论已经很复杂，它似乎只关心长椅上还有没有太阳。','Someone calls softly outside, ignored by a cat interested only in the sunny bench.']],
 [/robot|机器人/,['设备还亮着待机灯。大家终于安静下来时，它又响了一声，像在补充一条谁都不想继续听的意见。','The standby light remains on; another beep sounds like one final unwanted comment.']],
 [/loan|borrow|借/,['电源线盘了两次才盘好，桌角留下一个空位。借东西时觉得只是伸一下手，归还时才看见别人原来的安排。','Winding the cable leaves an empty desk corner and a clearer view of the lender’s original plans.']],
 [/junior|师弟|师妹/,['你回头看了看那个刚入组时还不敢发言的人。对方也有点不好意思，低头把刚才找到的那一页重新放好。','The once-silent newcomer looks shy and puts the useful page back in place.']],
 [/field|访谈|田野/,['提纲上还有几处空白。你把对方说过的话读了一遍，发现那些没有按预想回答的地方，反而记得最清楚。','The guide still has gaps, but the unexpected parts of the account remain clearest.']],
 [/archive|文本|史料|脚注/,['书页上夹着一张新的索引。那句话已经不是最开始读到的样子，旁边的问号却终于有了页码。','A new index marks the changed quotation; its question mark finally has a page reference.']]
 ];
 for(const e of C.endings){const original=e.desc,match=epilogues.find(([rx])=>rx.test(e.id+' '+e.title)),tail=match?P(...match[1]):after[e.kind]||after.open;e.desc=P(original+'\n\n'+tail,()=>E(original)+'\n\n'+E(tail));}
 function frame(w,route,direction){const profile=window.MEETING_MENTORS.find(w.config?.mentorId),q=N.setting(route,profile?.id),d=window.MEETING_DIRECTIONS.find(direction),project=C.projects.find(p=>p.id===route);return P(q.school.name+'，'+q.city.name+'。你把「'+(d?.topic||project.topic||project.name)+'」写在今天的笔记页上。'+(profile?' '+profile.name+'的上一条批注还夹在文件里。':''),()=>`${E(q.school.name)}, ${E(q.city.name)}. Your notebook is headed ${E(d?.topic||project.topic||project.name)}.${profile?` ${E(profile.name)}’s previous annotation is still in the file.`:''}`);}
 function academic(w,type,scene){const lines={people:['你把椅子拉近一点，对方先看了一眼时间，等你开口。','You pull up a chair while the other person checks the time.'],'collab-start':['对方把自己的草稿也摆在桌上，问这一轮两个人各做哪一部分。','Your partner puts down a draft and asks how the work will be divided.'],'collab-work':['两份草稿并排开着，最有分歧的那一行还没有改。','Two drafts remain open at the disputed line.'],milestone:['表格上的日期早已填好，今天终于轮到你坐到委员对面。','The date has long been on the form; now you face the panel.'],recovery:['旧稿还在文件夹里，你先把评语重新读了一遍。','The old draft remains; you reread its comments first.']};return lines[type]?scene+'\n\n'+P(...lines[type]):scene;}
 function npc(w,id,scene){const n=w.world?.npcs[id],g=window.MEETING_WORLD.goals.find(g=>g.id===n?.goal);return g?.motive?scene+'\n\n'+g.motive:scene;}
 function aftermath(w,t,action,success){const lines={peer:success?['对方把时间也写在纸上，提醒你到时别忘了归还。','The lender writes down a return time.']:['对方看了眼自己的日历，摇摇头。这次得再找一个办法。','The peer checks the calendar and cannot lend this time.'],mentor:success?['导师转来联系人，让你自己把接下来的安排谈清楚。','The supervisor forwards a contact for you to arrange the next step.']:['回复比你想的短：这周实在挤不开，先看看其他入口。','The brief reply says this week is full; try another route.'],resource:success?['入口终于可以用了，旧文件上的问号还得接着查。','Access returns, with the old file’s questions still pending.']:['你把等待写进日历，今天这半天已经过去了。','The wait goes into the calendar; today’s slot has passed.']};return lines[action]?' '+P(...lines[action]):'';}
 return {arcs,sides,frame,academic,npc,aftermath,after,routeArcs:R.stories.length,sideArcs:S.stories.length,campusArcs:A.campus.length,countsUnchanged:true};
})();
