<template>
  <nuxt-link :to="content ? `/socialMedia/${content.id}` : '#'"
             class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             v-if="type == 'post'">
    <div class="flex items-center">
      <img v-if="content && content.media" :src="content.media.path"
           class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>
  <div v-else-if="type == 'story'"
       class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed">
    <client-only>
      <light v-if="media.length > 0" :media="media" :showLightBox="showLightBox" @onClosed="closeLightBox">
      </light>
    </client-only>
    <div @click="setLight(content && content.media ? content.media.path : '/images/logo.png')"
         class="flex items-center click">
      <img v-if="content && content.media" :src="content.media.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600 click"/>
      <img v-else src="/images/logo.png"
           class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600 click"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </div>
  <nuxt-link :to="createUserLink()"
             class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             v-else-if="type == 'freelancer' || type == 'employer'">
    <div class="flex items-center">
      <img v-if="content.profile.avatar" :src="content.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>
  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/portfolios/${content.id}` : '#'" v-else-if="type == 'portfolio'">
    <div class="flex items-center">
      <img v-if="content && content.images.length > 0" :src="content.images[0].path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>
  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/projects/${content.id}` : '#'" v-else-if="type == 'project'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="createUserSkillLink()" v-else-if="type == 'register'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="`/help`"
             v-else-if="type == 'avatar_denied'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/profiles/${content.id}` : '#'" v-else-if="type == 'avatar_accepted'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/profiles/${content.id}` : '#'" v-else-if="type == 'bg_accepted'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/help'"
             v-else-if="type == 'national_denied'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/account'"
             v-else-if="type == 'national_accepted'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/help'"
             v-else-if="type == 'portfolio_denied'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/profiles/${content.id}` : '#'" v-else-if="type == 'portfolio_accepted'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'#'"
             v-else-if="type == 'password_changed'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/profiles/${content.id}` : '#'" v-else-if="type == 'follow'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/projects/${content.id}` : '#'" v-else-if="type == 'follow'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/help'"
             v-else-if="type == 'project_denied'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/wallet'"
             v-else-if="type == 'wallet'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'#'"
             v-else-if="type == 'withdraw_created'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/records'"
             v-else-if="type == 'withdraw'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="'/account-setting'" v-else-if="type == 'sheba_accepted'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/help'"
             v-else-if="type == 'sheba_denied'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="'/Membership-upgrade'" v-else-if="type == 'package'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>


  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="'/Membership-upgrade'" v-else-if="type == 'project_denied'">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/records'"
             v-else-if="type == 'withdraw_created' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/admin/VirifiUser/${content.id}` : '#'" v-else-if="type == 'admin_register' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>
  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/admin/VirifiUser/${content.id}` : '#'" v-else-if="type == 'admin_national_created' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/admin/VirifiUser/${content.id}` : '#'" v-else-if="type == 'admin_avatar_created' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/admin/VirifiUser/${content.id}` : '#'" v-else-if="type == 'admin_bg_created' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/admin/portfolios/${content.id}` : '#'" v-else-if="type == 'admin_portfolio_created' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/projects/${content.id}` : '#'" v-else-if="type == 'admin_project' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/posts/${content.id}` : '#'" v-else-if="type == 'admin_post' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="'/records'"
             v-else-if="type == 'admin_records' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed"
             :to="content ? `/admin/VirifiUser/${content.id}` : '#'" v-else-if="type == 'admin_sheba' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>

  <nuxt-link class=" click px-5 py-3 my-3 flex flex-wrap border-b-2 border-gray-400 border-dashed" :to="''"
             v-else-if="type =='admin_package' ">
    <div class="flex items-center">
      <img v-if="content && content.employer.profile.avatar > 0" :src="content.employer.profile.avatar.path"
           class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <img v-else src="/images/logo.png" class="w-8 h-8 ml-3 rounded-full border-2 border-solid border-gray-600"/>
      <div class="text-sm text-black">{{ text }}</div>
    </div>
    <div class="text-sm text-gray-600">{{ ($moment(createdAt).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
  </nuxt-link>


</template>

<script>
export default {
  name: "Notification",
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      media: [],
      showLightBox: false,
    }
  },
  methods: {
    setLight(path) {
      this.media.push({
        thumb: path,
        src: path,
      })
      this.showLightBox = true;
    },
    closeLightBox() {
      this.media = [];
      this.showLightBox = false;
    },
    createUserLink() {
      if (!this.content) {
        return '#';
      }
      if (this.$hasRole(this.content.roles, 'freelancer')) {
        return `/profiles/${this.content.id}`;
      } else {
        return `/employer/${this.content.id}`;
      }
    },
    createUserSkillLink() {
      if (!this.content) {
        return '#';
      }
      if (this.$hasRole(this.content.roles, 'freelancer')) {
        return `/skills`;
      } else {
        return `/createProject`;
      }
    }
  }
}
</script>
