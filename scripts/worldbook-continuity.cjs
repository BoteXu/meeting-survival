/* The selector joins shared scenes without silently skipping publication states. */
module.exports=function continuity(n){
 const conflict=(n>>>8)%6,rawClosure=(n>>>16)%6;
 const closure=conflict===5?[1,2,3,4][rawClosure%4]:rawClosure;
 let aftermath=(n>>>18)%4;
 if(aftermath===1&&conflict!==1)aftermath=0;
 if(closure===3&&aftermath===3)aftermath=2;
 const submitted=conflict===5||closure===1||closure===3;
 let beforeConflict=conflict===5?'春季，他们先确认了共同稿件的贡献记录和作者名单，投出经全体作者同意的版本。编辑送审后，等待了数周才发来修改决定。下面这次讨论发生在收到意见以后，接收仍没有保证。\n\n':'';
 let beforeClosure='';
 if(conflict!==5&&closure===1)beforeClosure='在此前的分歧处理完之后，他们逐项确认了能公开的材料、作者名单和投稿版本。稿件投出后进入外审，几周后收到的是拒稿决定。下面的安排从这封信开始。\n\n';
 if(conflict!==5&&closure===3)beforeClosure='春末，团队完成了缺项核查，确认贡献和作者名单后提交稿件。外审意见在暑假到来；他们逐条答复，把无法扩大解释的部分明确收窄，并在期限内修回。编辑再次送审后，决定仍等待了数周。\n\n';
 if(conflict===5&&closure===2)beforeClosure='返修讨论最终暴露出暂时无法解决的分歧。他们向编辑说明情况，撤回这份在修稿件，而不是让稿件在合作暂停后仍留在无人负责的状态。共同工作如何保存，随后另行商量。\n\n';
 if(conflict===5&&closure===4)beforeClosure='这次修改没能在期限内补齐关键条件。团队先向编辑申请延长时间，复查后仍认为当前材料不够，最终说明理由并撤回稿件，转向调整课题。\n\n';
 const beforeAftermath='到2027年秋天，几个人再次碰面，有人返校，有人通过视频参加。准备毕业的高年级同学已完成答辩和交接，开始新的工作；返校谈近况并不意味着仍能随时替组里承担任务。各人的去向和文章状态在记录里分别写明。\n\n';
 return {conflict,closure,aftermath,submitted,beforeConflict,beforeClosure,beforeAftermath,
  outcome:['in-review','rejected','paused','accepted','scope-changed','undecided'][closure]};
};
