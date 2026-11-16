/**
 * AI Service Tests
 *
 * Tests for the AI Service business logic layer.
 */

import * as assert from 'assert';
import { AIService } from '@application/services/aiService';
import { IExtensionConfig } from '@shared/types';
import { AI_PROVIDERS } from '@shared/constants';

suite('AI Service Tests', () => {
  let aiService: AIService;

  setup(() => {
    aiService = new AIService();
  });

  test('Should initialize with mock provider', async () => {
    const config: IExtensionConfig = {
      aiProvider: AI_PROVIDERS.MOCK,
    };

    await aiService.initialize(config);
    assert.ok(aiService.isReady());
  });

  test('Should generate completion', async () => {
    const config: IExtensionConfig = {
      aiProvider: AI_PROVIDERS.MOCK,
    };

    await aiService.initialize(config);
    const result = await aiService.getCompletion('test prompt');
    assert.ok(result);
    assert.ok(result.includes('test prompt'));
  });

  test('Should stream completion', async () => {
    const config: IExtensionConfig = {
      aiProvider: AI_PROVIDERS.MOCK,
    };

    await aiService.initialize(config);

    let result = '';
    for await (const chunk of aiService.streamCompletion('test')) {
      result += chunk;
    }

    assert.ok(result.length > 0);
  });
});
