package com.server.domain.member.service.dto.response;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;

import com.server.domain.reward.entity.NewReward;
import com.server.domain.reward.entity.RewardType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NewRewardsResponse {
	private Long rewardId;
	private RewardType rewardType;
	private Integer rewardPoint;
	private boolean isCanceled;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;

	public static Page<NewRewardsResponse> convert(Page<NewReward> rewards) {
		return rewards.map(
			newReward -> NewRewardsResponse.builder()
				.rewardId(newReward.getRewardId())
				.rewardType(newReward.getRewardType())
				.rewardPoint(newReward.getRewardPoint())
				.isCanceled(newReward.isCanceled())
				.createdDate(newReward.getCreatedDate())
				.modifiedDate(newReward.getModifiedDate())
				.build()
		);
	}
}
