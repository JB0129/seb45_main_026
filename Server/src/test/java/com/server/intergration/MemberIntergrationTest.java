package com.server.intergration;

import static org.junit.jupiter.api.DynamicTest.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;

import com.server.domain.cart.entity.Cart;
import com.server.domain.channel.entity.Channel;
import com.server.domain.member.entity.Member;
import com.server.domain.order.entity.Order;
import com.server.domain.reply.entity.Reply;
import com.server.domain.subscribe.entity.Subscribe;
import com.server.domain.video.entity.Video;
import com.server.domain.watch.entity.Watch;

public class MemberIntergrationTest extends IntegrationTest {

	// 로그인한 사용자 정보
	Member loginMember;
	Channel loginMemberChannel;
	List<Video> loginMemberVideos = new ArrayList<>();
	List<Order> loginMemberOrders = new ArrayList<>();
	List<Cart> loginMemberCarts = new ArrayList<>();
	List<Subscribe> loginMemberSubscribes = new ArrayList<>();
	List<Watch> loginMemberWatches = new ArrayList<>();
	List<Reply> loginMemberReplies = new ArrayList<>();
	String loginMemberEmail = "login@email.com";
	String loginMemberPassword = "qwer1234!";
	String loginMemberAccessToken;

	// 다른 사용자들의 정보
	Member otherMember1;
	Member otherMember2;
	Member otherMember3;
	Member otherMember4;

	Channel otherMemberChannel1;
	Channel otherMemberChannel2;
	Channel otherMemberChannel3;
	Channel otherMemberChannel4;

	List<Video> otherMemberVideos1 = new ArrayList<>();
	List<Video> otherMemberVideos2 = new ArrayList<>();
	List<Video> otherMemberVideos3 = new ArrayList<>();
	List<Video> otherMemberVideos4 = new ArrayList<>();

	String otherMemberEmail1 = "other1@email.com";
	String otherMemberEmail2 = "other2@email.com";
	String otherMemberEmail3 = "other3@email.com";
	String otherMemberEmail4 = "other4@email.com";
	String otherMemberPassword = "other1234!";
	String otherMemberAccessToken1;
	String otherMemberAccessToken2;
	String otherMemberAccessToken3;
	String otherMemberAccessToken4;

	@BeforeAll
	void pre() {

	}

	@AfterAll
	void post() {

	}
	@TestFactory
	@DisplayName("자신의 프로필이미지, 이메일, 닉네임을 조회한다.")
	Collection<DynamicTest> getMember() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 리워드 목록을 조회한다.")
	Collection<DynamicTest> getRewards() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 구독 목록을 조회한다.")
	Collection<DynamicTest> getSubscribes() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 장바구니 목록을 조회한다.")
	Collection<DynamicTest> getCarts() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 결제 내역을 조회한다.")
	Collection<DynamicTest> getOrders() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 구매한 강의 목록을 조회한다.")
	Collection<DynamicTest> getPlaylists() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 구매한 강의 목록을 채널별로 그룹화 해서 조회한다.")
	Collection<DynamicTest> getPlaylistChannels() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 구매한 강의 목록을 채널별로 상세 조회한다.")
	Collection<DynamicTest> getPlaylistChannelDetails() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 시청 기록을 조회한다.")
	Collection<DynamicTest> getWatchs() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 닉네임을 변경한다.")
	Collection<DynamicTest> updateNickname() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("프로필 이미지를 변경한다.")
	Collection<DynamicTest> updateImage() {
		return List.of(
			dynamicTest(
				"1",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("비밀번호 변경 시 새 비밀번호를 입력하고 비밀번호를 변경한다.")
	Collection<DynamicTest> updatePassword() {
		return List.of(
			dynamicTest(
				"기존 비밀번호가 잘못된 경우",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("자신의 프로필 이미지를 삭제한다.")
	Collection<DynamicTest> deleteImage() {
		return List.of(
			dynamicTest(
				"기존 비밀번호가 잘못된 경우",
				() -> {

				}
			)
		);
	}

	@TestFactory
	@DisplayName("회원을 탈퇴시키고 관련된 모든 정보를 삭제 및 갱신한다.")
	Collection<DynamicTest> deleteMember() {
		return List.of(
			dynamicTest(
				"기존 비밀번호가 잘못된 경우",
				() -> {

				}
			)
		);
	}
}
