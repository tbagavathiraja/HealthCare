SELECT css.`candiate_status_id` ,
css.`canditate_status`, 
IFNULL(sta.number_of_candidates,0) AS number_of_candidates 
FROM `candidate_status` css 
LEFT JOIN (
	SELECT c.`candidate_status_id`,
    c.`created_by` as agent_id,
    cs.`canditate_status`,
    COUNT(*) AS number_of_candidates FROM `candidate` c 
    INNER JOIN `candidate_status` cs ON cs.`candiate_status_id` = c.`candidate_status_id` 
    INNER JOIN `candidate_bgv_detail` cbd ON cbd.`candidate_id` = c.`candidate_id` 
    INNER JOIN partner p ON p.partner_id = c.`partner_id` 
    INNER JOIN `employer` emp ON emp.`employer_id` = c.`employer_id` 
    INNER JOIN `partner_details` pd ON pd.partner_id = p.partner_id 
    INNER JOIN `state` s ON s.state_id = pd.state 
    INNER JOIN `region` r ON r.region_id = s.region_id 
    WHERE (p.`partner_id` = -1 OR -1 = -1 ) AND ( cs.`group_by_status` = '-1' OR '-1' = - 1) 
    AND (c.`candidate_status_id`= '-1' OR '-1'= -1) AND (emp.employer_id= -1 OR -1 = -1) 
    AND (r.`region_id`= -1 OR -1= -1) AND (s.`state_id`= -1 OR -1= -1) 
    AND DATE(c.created_date) BETWEEN CAST('2017-10-29' AS DATE) 
    AND CAST('2017-11-29' AS DATE) 
    GROUP BY cs.`group_by_status`,c.created_by 
    ) sta ON sta.candidate_status_id = css.`candiate_status_id` 
    WHERE (css.`group_by_status` = '-1' OR '-1' = - 1) 
    #AND (sta.candidate_status_id = '-1' OR '-1' = -1)
