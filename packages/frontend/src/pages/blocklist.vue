<template>
	<MkStickyContainer>
		<template #header><MkPageHeader v-model:tab="src" :actions="headerActions" :tabs="$i ? headerTabs : headerTabsWhenNotLogin" :displayMyAvatar="true"/></template>
		<MkSpacer :contentMax="800">
			<MkHorizontalSwipe v-model:tab="src" :tabs="$i ? headerTabs : headerTabsWhenNotLogin">
				<MkUserList :pagination="BlockerUserList"/>
			</MkHorizontalSwipe>
		</MkSpacer>
	</MkStickyContainer>
</template>

<script lang="ts" setup>
import { misskeyApi } from '@/scripts/misskey-api.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import MkUserList from '@/components/MkUserList.vue';

definePageMetadata(() => ({
	title: "お前をブロックした人リスト",
	icon: 'ti ti-list',
}));

const BlockerUserList = { endpoint: 'blocklist', noPaging: true };
</script>