export default function (type){
    const articleArray = {
        '职场思维':'job_hunting_skill_detail',
        '职场沟通':'workplace_communication_detail',
        '面试技巧':'interview_skills_detail',
        '通用技能':'general_skill_detail',
        '工具推荐':'tool_recommendation_detail',
    }
    return articleArray[type]
}
